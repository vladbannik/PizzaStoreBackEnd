const express = require('express');
const { nameValidator, descriptionValidator, categoryValidator, priceValidator, imgValidator } = require('../validation/products');
const withJWT = require('../utils/withJWT');

const {
    getAllProducts,
    createProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/products')

const router = express.Router();

router.get('/', getAllProducts);
router.post('/', [nameValidator, descriptionValidator, categoryValidator, priceValidator, imgValidator, withJWT], createProducts);
router.patch('/:id', [withJWT], updateProduct);
router.delete('/:id', withJWT, deleteProduct);


module.exports = router;