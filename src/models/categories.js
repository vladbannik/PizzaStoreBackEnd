const { Schema, model } = require('mongoose');

const schema = Schema({
  id: {
    type: String,
    unique: true,
  },
  name: {
    type: String,
    unique: true,
  },
});

module.exports = model('Categories', schema);
