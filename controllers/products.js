const Product = require('../models/products');
module.exports = {
  getById: function(req, res, next) {
    Product.findById(req.params.productId)
      .then(result => {
        if(result) {
          res.status(201).json(result)
        } else {
          res.status(404).json({message: "Product Not Found"})
        }
      })
      .catch(err => {
        next(err)
      })
  },

  getAll: function(req, res, next) {
    Product.find()
      .then(result => {
        res.status(200).json(result)
      })
      .catch(err => {
        next(err)
      })
  },
updateById: function(req, res, next) {
  if(req.decoded.isSeller) {
    Product.findByIdAndUpdate(req.params.productId,{name:req.body.name})
      .then(result => {
        if(result) {
          res.status(201).json(result)
        } else {
          res.status(404).json({message: "Product Not Found"})
        }
      })
      .catch(err => {
        next(err)
      })
  } else {
    next({status: 401, message: "You Are not Authorized, Please Login as Seller"})
  }
 },
deleteById: function(req, res, next) {
  if(req.decoded.isSeller) {
    Product.findByIdAndRemove(req.params.productId)
      .then(result => {
        if(result) {
          res.status(201).json(result)
        } else {
          res.status(404).json({message: "Product Not Found"})
        }
      })
  } else {
    next({status: 401, message: "You Are not Authorized, Please Login as Seller"})
  }
 },
create: function(req, res, next) {
  const {name, description, price} = req.body
  if(req.decoded.isSeller) {
    const model = new Product({
      name, description, price
    })
    model.save()
      .then(result => {
        res.status(201).json(result)
      })
      .catch(err => {
        next(err)
      })
  } else {
    next({status: 401, message: "You Are not Authorized, Please Login as Seller"})
  }
 },
}