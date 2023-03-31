const db = require("../models");
const { Op } = require("sequelize")

const Products = db.products;

const productController = {
    getProducts: async (req, res) => {
        try {
            const q = req.query.q ? req.query.q : ""

            const result = await Products.findAll({
                where: {
                    name: {
                        [Op.like]: `%${q}%`
                    }
                }
            })

            return res.status(200).json({
                message: 'data fetched',
                result: result
            });
        } catch(err) {
            return res.status(400).json({
                message: err
            });
        }
    },

    addProducts: async (req, res) => {
        try{
            const data = {
                name: req.body.name,
                description: req.body.description,
                category_id: req.body.category_id
            }

            const dataEnt = Object.entries(data);
            dataEnt.map((val) => {
                if (!val[1]) {
                throw new Error(val[0] + " cannot be empty.");
                }
            });

            const result = await Products.create({ ...data });
            res.send(result);

        } catch (err) {
            return res.status(400).json({
                message: err
            });
        }
    },
    
    editProducts: async (req, res) => {
        try{
            const pid = req.query.product_id

            const data = {
                product_id: pid,
                name: req.body.name,
                description: req.body.description,
                category_id: req.body.category_id
            }

            const dataEnt = Object.entries(data);
            dataEnt.map((val) => {
                if (!val[1]) {
                throw new Error(val[0] + " cannot be empty.");
                }
            });

            const result = await Products.update({ ...data });
            res.send(result);
        } catch (err) {
            return res.status(400).json({
                message: err
            });
        }
    }
}

module.exports = productController