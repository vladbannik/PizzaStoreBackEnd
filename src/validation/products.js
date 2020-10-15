const { check } = require('express-validator');

const nameValidator = check('name', 'Name must be required').exists();
const descriptionValidator = check('description', 'Description must be required').exists();
const priceValidator = check('price', 'Price must be required').exists();
const sizeValidator = check('size', 'Size must be required').exists();
const imageValidator = check('image', 'Image must be required').exists();
const categoryValidator = check('categoryName', 'CategoryName must be required').exists();

module.exports = { nameValidator, descriptionValidator, categoryValidator, priceValidator, sizeValidator, imageValidator };
