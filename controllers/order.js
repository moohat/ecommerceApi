const Order = require('../models/order')
const Product = require('../models/products')
module.exports = {
    addProduct: async (req, res, next) => {
        const {_id} = req.decoded
        const quantity = +req.body.quantity
        const productId = req.query.productId
        const product = await Product.findById(productId)
        let order = await Order.findOne({userId: _id, status: "Pending"})
        if(product) {
            if(order) {
                let index = order.products.findIndex(p => p._id == productId)
                if(index > -1) {
                    let productItem = order.products[index]
                    productItem.quantity += quantity
                    order.products[index] = productItem
                    order.total_price += quantity * product.price
                } else {
                    order.total_price += quantity * product.price
                    order.products.push({_id: product._id, name: product.name, price: product.price, quantity})
                }
                order = await order.save()
                res.status(201).json(order)
            } else {
                const newOrder = new Order({
                    userId: _id,
                    products: [{
                        _id: product._id,
                        name: product.name,
                        price: product.price,
                        quantity
                    }],
                    total_price: product.price * quantity
                })
                await newOrder.save()
                res.status(201).json(newOrder)
            }
        } else {
            next({status: 404, message: "Product Not Found"})
        }
    },
    pay: async (req, res, next) => {
        const userId = req.decoded._id
        const update = await Order.findOneAndUpdate({userId, status: "Pending"}, {status: "Paid"})
        if(update) res.status(200).json(update)
        else {
            next({
                status: 404,
                message: "Order Not Found"
            })
        }
    },
    findOne: async (req, res, next) => {
        try {
            const _id = req.decoded._id
            let order = await Order.findOne({userId: _id, status: "Pending"})
            res.status(201).json(order)
        } catch (error) {
            next(error)            
        }
    },
    findAll: async (req, res, next) => {
        const {_id} = req.decoded
        try {
            let order = await Order.find({userId: _id, status: "Paid"})
            if(order) res.status(200).json(order)
            else {
                next({
                    status: 404,
                    message: "Order not Found"
                })
            }
        } catch (error) {
            next(error)
        }
    }
}