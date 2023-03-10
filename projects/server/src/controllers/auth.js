const db = require("../models")
const User = db.user
const {Op} = require("sequelize")
const authControllers = {
    authRegistration : async (req,res) =>{
        try {
            const {username,email,phoneNumber,isVerified,gender,birtdate,profilePicture,isTenant} = req.body;
            const checkEmailUsername = await User.findOne({
                where:{
                    [Op.or]:{username:username,email:email,phoneNumber:phoneNumber}
                }
            })

            if (checkEmailUsername){
                return res.send("Email atau Username sudah terdaftar")
            }

            await User.create({
                ...req.body
            })


        } catch (err) {
            
        }
    },
    authLogin : async (req,res) =>{
        
    }
}

module.exports = authControllers;