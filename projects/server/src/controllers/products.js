const db = require("../models");

const Products = db.products;

const productController = {
    getProducts: async (req, res) => {
        const productsPerPage = 10

        const page = parseInt(req.query.page) || 1;
        const offset = (page - 1) * productsPerPage;

        try {
            const products = await Products.findAll({ 
              limit: productsPerPage,
              offset,
            });
        
            const totalProducts = await Products.count();
        
            const totalPages = Math.ceil(totalProducts / productsPerPage); 
        
            res.status(200).json({ 
                data: products,
                currentPage: page,
                totalPages,
            });
        } catch (err) {
            res.status(400).json({ 
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