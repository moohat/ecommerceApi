const router = require('express').Router();
const productController = require('../controllers/products');

router.get('/', productController.getAll);
router.post('/new', productController.create);
router.get('/:productId', productController.getById);
router.put('/:productId', productController.updateById);
router.delete('/:productId', productController.deleteById);

module.exports = router;