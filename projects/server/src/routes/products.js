const express = require('express');
const router = express.Router();
const productController = require('../controllers/products');

router.get('/', productController.getProducts);
router.post('/products', productController.addProducts);
router.patch('/products', productController.editProducts);

module.exports = router;