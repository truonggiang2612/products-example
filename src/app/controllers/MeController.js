const Products = require('../models/Products');
const { mutipleMongooseToOject } = require('../../util/mongoose');

class MeController {
  //[GET] /me/stored/products
  storedProducts(req, res, next) {
    Products.find({})
      .then(products => res.render('me/stored-products', {
        products: mutipleMongooseToOject(products)
      }))
      .catch(next);
  }
}

module.exports = new MeController();
