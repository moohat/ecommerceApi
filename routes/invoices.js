const express = require('express');
const router = express.Router();
const userController = require('../app/api/controllers/users');
const productModel = require('../app/api/models/products');

var Cart = require('../app/api/models/cart')
// router.post('/cart/:id', userController.create);
router.get('/cart/:productId', function(req, res, next){
    var productId = req.params.productId;
    var cart = new Cart( {items: {}});
    productModel.findById(productId, function(err, product){
        if(err){
            next(err);
        }else{

            cart.add({productId: req.params.productId}, function(err, result){

                if(err){
                    next(err)
                }else{
                    res.json({status:"success", message:"invoice created",data:{result} })
                }
            });
        }
        // req.session.cart = cart;
        // console.log(({items}));
        

    })
});
router.post('/login', userController.login);
module.exports = router;