const router = require('express').Router()
const users = require('./users');
const productRoute = require('./products')
const orderRoute = require('./orders')
const invoiceRoute = require('./invoices')
const authentication = require('../middlewares/authentication');

router.get('/', function (req, res) {
    res.status(200).json({ "tutorial": "Build REST API with node.js" });
});
router.use('/users', users);


router.use(authentication)
router.use('/products', productRoute)
router.use('/order', orderRoute)
router.use('/invoices', invoiceRoute)



module.exports = router