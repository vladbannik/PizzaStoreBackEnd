const { check } = require('express-validator');

const nameValidator = check('name', 'Name must be required').exists();
const descriptionValidator = check('description', 'Description must be required').exists();
const priceValidator = check('price', 'Price must be required').exists();
const imgValidator = check('img', 'Img must be required').exists();
const categoryValidator = check('categoryId', 'CategoryId must be required').exists();

module.exports = { nameValidator, descriptionValidator, categoryValidator, priceValidator, imgValidator };
