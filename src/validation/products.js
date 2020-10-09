const { check } = require('express-validator');

const nameValidator = check('name', 'Name must be required').exists();
const descriptionValidator = check('description', 'Description must be required').exists();
const categoryValidator = check('categoryId', 'Description must be required').exists();

module.exports = { nameValidator, descriptionValidator, categoryValidator };
