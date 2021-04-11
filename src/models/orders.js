const { Schema, model } = require('mongoose');
const schema = Schema({
    id: {
        type: String,
        unique: true
    },
    data: { type: Date, default: Date.now },
    status: String,
    address: {
        type: Map,
        of: String
    },
    order: [Object]
});
module.exports = model('Orders', schema);
