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

// products
/*
id
name
desctiption
price: {
  small: 2
  m 4
  l 7
}
image
size?: []
CATEGORY

getAll
create - jwt
update - jwt
delete - jwt
 */

// order
/*
id,
date,
status
address: {
  firstnamr
  lastname
  phone
  address
}
order: [
{product_id, size, quantity, total_price}
]

getOrders - jwt
complete - jwt
update
 */
