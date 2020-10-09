const { Schema, model } = require('mongoose');
const { CategoriesShema } = require('../models/categories');
const schema = Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    description: String,
    price: {
        type: Map,
        of: String
    },
    img: String,
    categoryId: String,
});
module.exports = model('Products', schema);
