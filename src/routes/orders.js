const express = require('express');
const { statusValidator, addressValidator, orderValidator } = require('../validation/orders');
const withJWT = require('../utils/withJWT');

const {
    getAllOrders,
    createOrder,
    updateOrder
} = require('../controllers/orders')

const router = express.Router();

router.get('/', getAllOrders);
router.post('/', [statusValidator, addressValidator, orderValidator, withJWT], createOrder);
router.patch('/:id', withJWT, updateOrder);

module.exports = router;