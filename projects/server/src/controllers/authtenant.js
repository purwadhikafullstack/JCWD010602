const db = require('../models');
const { Op } = require('sequelize');
const User = db.user;
const { sequelize } = require('../models');
const bcrypt = require('bcrypt');

const tenantAuthController = {
    register: async (req, res) => {
        const t = await sequelize.transaction();

        try{
            const { name, email, password, phone_number, ktp } = req.body;

            const isExist = await User.findOne({
                where: {
                    [Op.or]: [
                        {
                            email: email
                        },
                        {
                            phone_number: phone_number
                        }
                    ]
                }
            })

            if (isExist){
                throw new Error ("User already registered")
            }

            const hashPassword = bcrypt.hashSync(password, 10)
            const data = {
                username: name,
                password: hashPassword,
                email,
                phoneNumber: phone_number,
                isVerified: true,
                isTenant: true
            }

            const result = await User.create({ ...data });
            delete result.dataValues.password;

            await t.commit();

            return res.status(201).json({
                message: 'new user registered',
                result: result,
            });
        } catch(err) {
            await t.rollback();

            console.log(err);
            res.status(400).json({
                message: err.toString(),
            });
        }
    },

    login: async (req, res) => {
        const { email, password } = req.body;
        const result = await User.findOne({
            where: {
                email: email
            }
        })

        if (!result){
            return res.status(400).json({
              message: "User not found"
            })
        }

        else{
            const check = bcrypt.compare(password, result.password)
        }

        if (!check){
            return res.status(400).json({
                message: "Wrong password!"
            })
        }
        else{
            return res.status(200).json({
                message: "Logged in",
                result: result
            })
        }
    }
}

module.exports = {};
