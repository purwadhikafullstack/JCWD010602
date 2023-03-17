const db = require("../models")
const User = db.user
const Verification = db.verification
const {Op} = require("sequelize")
const bcrypt = require("bcrypt")
const fs = require("fs")
const mustache = require("mustache")
const mailer = require("../lib/mailer")
const {sequelize} = require("../models")
const moment = require("moment")
const authControllers = {
    authRegistration : async (req,res) =>{
        const t = await sequelize.transaction()
        try {
            
            const {fullname,email,password,phoneNumber,gender,birtdate,isVerified,profilePicture} = req.body;
            const checkEmailPhoneNumber = await User.findOne({
                where:{
                    [Op.or]:{email:email,phoneNumber:phoneNumber}
                }
            })

            if (checkEmailPhoneNumber){
                return res.status(201).json({message:"Email atau Nomor Handphone sudah terdaftar"})
            }

            if (!fullname || !email || !password || !phoneNumber || !gender || !birtdate){
                return res.status(201).json({
                    message:"Mohon isi data dengan lengkap"
                })
            }
            const hashPassword = bcrypt.hashSync(password,10)
            const createUser = await User.create({
                fullname:fullname,
                email:email,
                password:hashPassword,
                phoneNumber:phoneNumber,
                isVerified:isVerified,
                gender:gender,
                birtdate:birtdate,
                profilePicture:profilePicture,
                isTenant:false
            })

            
            var verificationCode = Math.floor(100000 + Math.random() * 900000)
            verificationCode = verificationCode.toString().substring(0, 4);
            verificationCode =  parseInt(verificationCode)


            const template = fs
            .readFileSync(__dirname + "/../templates/verify.html")
            .toString();

            const renderTemplate =mustache.render(template,{
                fullname : fullname,
                verificationCode :verificationCode
            })

            mailer({
                to:email,
                subject:"Verify Account",
                html:renderTemplate
            })

         
            const _1hour = new Date()
            _1hour.setDate(_1hour.getDate() + 1)
            console.log(_1hour)
            const createVerification = await Verification.create({
                attempts : 1 ,
                otpCode : verificationCode,
                expiryDate : _1hour,
                userId : createUser.dataValues.id
            })
            
            await t.commit;
            
            res.status(200).json({
                message:"Anda berhasil mendaftar",
                result:createUser
            })

        } catch (err) {
            await t.rollback()
            console.log(err)
            res.status(400).json({
                message:err
            })
        }
    },
    verifyCode:async(req,res)=>{
        try {
            const {userId,otpCode} = req.body;
            const nowDate = new Date()
            const verifData  = await  Verification.findAll({
               include:{
                model:User
               },
               where:{userId:userId},
               order:[["expiryDate","DESC"]],
               limit:1
            })
            if(!verifData[0]){
                return res.status(201).json({
                    message:"Akun anda sudah terverifikasi"
                })
            }

            if (verifData[0].otpCode === otpCode){
                if(verifData[0].expiryDate > nowDate){
                    const userVerified = await User.update({ isVerified: true }, {
                        where: {
                          id: userId
                        }
                      })

                      await Verification.destroy({
                        where:{
                            userId:userId
                        }
                      })
                    return res.status(200).json({
                        message:"Anda berhasil melakukan verifikasi",
                        result:userVerified
                    })
                }else{
                    return res.status(202).json({
                        message : "Kode OTP yang anda masukkan sudah expired"
                    })
                }
            }else{
                return res.status(203).json({
                    message:"Kode OTP yang anda masukkan salah"
                })
            }

        } catch (err) {
            console.log(err)
        }
    },
    resendVerification : async (req,res) =>{
        try {

            var verificationCode = Math.floor(100000 + Math.random() * 900000)
            verificationCode = verificationCode.toString().substring(0, 4);
            verificationCode =  parseInt(verificationCode)
            const nowDate = new Date()
            const _1day = new Date()
            _1day.setDate(_1day.getDate() + 1)

            const {userId,fullname,email} = req.body;

            const userData = await Verification.findOne({
                include:{
                    model:User  
                },
                where:{userId:userId}
            })
            
            const countAttempts = await Verification.count({
                where:{
                    userId : userId
                }
            })

         
            // console.log(Boolean(userData.User.dataValues.suspend))

            if(userData.User.dataValues.isVerified){
                return res.status(201).json({
                    message:"Akun anda sudah terverifikasi"
                })
            }   


            if (!userData.User.dataValues.isVerified && !userData.User.dataValues.suspend){
                if(countAttempts >= 5){
                    await User.update({ suspend: _1day }, {
                        where: {
                          id: userId
                        }
                    })
                    
                    return res.status(202).json({
                        message:"Kode verifikasi dapat dilakukan 24 jam kedepan"
                    })
                }else{
                const resendVerif = await Verification.create({
                    attempts : countAttempts + 1,
                    otpCode : verificationCode,
                    expiryDate : _1day,
                    userId : userId

                })
                const template = fs
                .readFileSync(__dirname + "/../templates/verify.html")
                .toString();
    
                const renderTemplate =mustache.render(template,{
                    fullname : fullname,
                    verificationCode :verificationCode
                })
    
                mailer({
                    to:email,
                    subject:"Verify Account",
                    html:renderTemplate
                })
                
                return res.status(200).json({
                    message : "Anda berhasil mengirimkan verification code",
                    result:resendVerif
                })
                }
            }

            if(userData.User.dataValues.suspend){
                if(userData.User.dataValues.suspend > nowDate){

                    return res.status(203).json({
                        message:`Anda sudah melakukan pengiriman kode OTP sebanyak 5 kali `
                    })
                }else{

                    const deleteVerif = await Verification.destroy({
                        where:{
                            attempts :{[Op.lte]: 5},
                            userId : userId
                        }
                    })

                    const newAttempts = await Verification.count({
                        where:{
                            userId : userId
                        }
                    })
                   
                    const resendVerif = await Verification.create({
                        attempts : newAttempts + 1,
                        otpCode : verificationCode,
                        expiryDate : _1day,
                        userId : userId
    
                    })
                    const template = fs
                    .readFileSync(__dirname + "/../templates/verify.html")
                    .toString();
        
                    const renderTemplate =mustache.render(template,{
                        fullname : fullname,
                        verificationCode :verificationCode
                    })
        
                    mailer({
                        to:email,
                        subject:"Verify Account",
                        html:renderTemplate
                    })
                    
                    await User.update({ suspend: null }, {
                        where: {
                          id: userId
                        }
                    })
                    return res.status(200).json({
                        message : "Anda berhasil mengirimkan verification code",
                        result:resendVerif
                    })
                }
                
            }

        } catch (err) {
            console.log(err)
        }
    },
    authLogin : async (req,res) =>{
        
    }
}

module.exports = authControllers;