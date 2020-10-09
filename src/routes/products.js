const express = require('express');
const { nameValidator } = require('../validation/categories');
const withJWT = require('../utils/withJWT');

const {
    getAllProducts,
    createProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/products')

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', [nameValidator, withJWT], createProducts);
router.patch('/:id', [nameValidator, withJWT], updateProduct);
router.delete('/:id', withJWT, deleteProduct);


module.exports = router;