const express = require('express');
const router = express.Router();
const productController = require('../app/api/controllers/products');
var jwt = require('jsonwebtoken');

router.get('/', productController.getAll);
router.post('/new',validateSeller, productController.create);
router.get('/:productId', productController.getById);
router.put('/:productId', productController.updateById);
router.delete('/:productId', productController.deleteById);

function validateSeller(req, res, next) {
    
    jwt.verify(req.headers['token'], req.app.get('secretKey'), function(err, decoded) {
      if (err) {
        res.json({status:"error", message: err.message, data:null});
      }else{        
        if(!decoded.isSeller){
        // console.log(typeof decoded.isSeller);
            res.json({status:"error", message: "Only seller can upload", data:null})
            
        }else{          
        // console.log(typeof decoded.isSeller);
            console.log(decoded.isSeller)         
            next();
        }
      }
    });
    
  }
module.exports = router;