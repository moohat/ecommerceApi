const mongoose = require('mongoose');
//Define a schema
const Schema = mongoose.Schema;
const orderSchema = new Schema({
_id : mongoose.Schema.Types.ObjectId,
product : {type: mongoose.Schema.Types.ObjectId, ref: 'Product'},
quantity: {type: Number, default: 1}
});
module.exports = mongoose.model('Order', orderSchema)