const express = require('express');
const router = express.Router();

const productsController = require('../app/controllers/ProductsController');

router.get('/create', productsController.create);
router.post('/store', productsController.store);
router.get('/:id/edit', productsController.edit);
router.put('/:id', productsController.update);
router.delete('/:id', productsController.destroy);
router.get('/:slug', productsController.show);

module.exports = router;
