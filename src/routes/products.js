const express = require('express');
const { nameValidator, descriptionValidator, categoryValidator } = require('../validation/products');
const withJWT = require('../utils/withJWT');

const {
    getAllProducts,
    createProducts,
    updateProduct,
    deleteProduct
} = require('../controllers/products')

const router = express.Router();

router.get('/', getAllProducts);

router.post('/', [nameValidator, descriptionValidator, categoryValidator, withJWT], createProducts);
router.patch('/:id', [nameValidator, descriptionValidator, categoryValidator, withJWT], updateProduct);
router.delete('/:id', withJWT, deleteProduct);


module.exports = router;