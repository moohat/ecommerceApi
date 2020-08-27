const mongoose = require('mongoose');
//Define a schema

mongoose.connect('mongodb://localhost:27017/ecommerce', {useNewUrlParser: true, useUnifiedTopology: true})

const Order = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId
    },
    products : [{
        _id: mongoose.Schema.Types.ObjectId,
        name: String,
        quantity: Number,
        price: Number
    }],
    status: {
        type: String,
        enum: ['Paid', 'Pending'],
        default: 'Pending'
    },
    total_price: {
        type: Number
    }
});
module.exports = mongoose.model('Order', Order)