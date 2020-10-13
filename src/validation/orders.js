const { check } = require('express-validator');

const statusValidator = check('status', 'Status must be required').exists();
const addressValidator = check('address', 'Address must be required').exists();
const orderValidator = check('order', 'Order must be required').exists();

module.exports = { statusValidator, addressValidator, orderValidator };
