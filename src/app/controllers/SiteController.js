const Products = require('../models/Products');
const { mutipleMongooseToOject } = require('../../util/mongoose');

class SiteController {
  // [GET] /
  index(req, res, next) {
    Products.find({})
      .then(products => {
        res.render('home', {
          products: mutipleMongooseToOject(products)
        });
      })

      .catch(next);
  }


  //[GET] /introduce
  introduce(req, res) {
    res.render('introduce');
  }


  //[GET] /contact
  contact(req, res) {
    res.render('contact');
  }

}

module.exports = new SiteController();
