const db = require("../models");

const Category = db.category;

const categoryController = {
    getCategory: async (req, res) => {
        try{
            const result = await Category.findAll()

            return res.status(200).json({
                message: "Categories data fetched",
                result: result
            })
        } catch(err) {
            return res.status(400).json({
                message: err
            })
        }
    },
    addCategory: async (req, res) => {
        try{
            const data = {
                name: req.body.name
            }

            const dataEnt = Object.entries(data);
            dataEnt.map((val) => {
                if (!val[1]) {
                throw new Error(val[0] + " cannot be empty.");
                }
            });

            const result = await Category.create({ ...data });
            res.send(result);
        } catch(err){
            return res.status(400).json({
                message: err
            })
        }
    },
    editCategory: async (req, res) => {

    }
}

module.exports = categoryController