const mongoose = require('mongoose')

const OrderSchema = mongoose.Schema({
  name: String,
  quantity: Number
})

module.exports = mongoose.model('Order', OrderSchema);