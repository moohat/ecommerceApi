const router = require('express').Router()
const OrderController = require('../controllers/order')
router.get('/inq', OrderController.findOne)
router.get('/pay', OrderController.pay)
router.get('/history', OrderController.findAll)

module.exports = router;