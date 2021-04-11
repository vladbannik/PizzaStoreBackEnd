const { check } = require('express-validator');

const nameValidator = check('name', 'Name must be required').exists();

module.exports = { nameValidator };
