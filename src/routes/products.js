const express = require('express');
const { nameValidator, descriptionValidator, categoryValidator, priceValidator, sizeValidator, imageValidator } = require('../validation/products');
const withJWT = require('../utils/withJWT');

const {
    getAllProducts,
    getProduct,
    createProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/products')

const router = express.Router();

router.get('/', getAllProducts);
router.get('/:categoryName', getProduct);
router.post('/', [nameValidator, descriptionValidator, categoryValidator, priceValidator, sizeValidator, imageValidator, withJWT, createProducts]);
router.patch('/:id', [withJWT], updateProduct);
router.delete('/:id', withJWT, deleteProduct);


module.exports = router;