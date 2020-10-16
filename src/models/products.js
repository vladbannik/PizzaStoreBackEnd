const { Schema, model } = require('mongoose');
const schema = Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    description: String,
    price: Object,
    sizes: [{ id: String, label: String, cost: String }],
    image: String,
    categoryName: String,
});
module.exports = model('Products', schema);
