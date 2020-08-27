const router = require("express").Router()
const OrderController = require('../controllers/order')

router.post('/', OrderController.addProduct)

module.exports = router;