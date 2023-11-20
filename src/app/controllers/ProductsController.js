const Products = require('../models/Products');
const { mongooseToObject } = require('../../util/mongoose');

class ProductsController {
  //[GET] /products/:slug
  show(req, res, next) {
    Products.findOne({ slug: req.params.slug })
      .then(product => {
        res.render('products/show', { course: mongooseToObject(product) });
      })
      .catch(next);
  }

  //[GET] /products/create
  create(req, res, next) {
    res.render('products/create')
  }

  //[POST] /products/store
store(req, res, next) {
  // Lấy thông tin từ request body
  const formData = req.body;
  console.log(formData); // Thêm log này để kiểm tra dữ liệu đầu vào

  // Tạo một đối tượng mới của model Products
  const product = new Products(formData);

  // Lưu đối tượng product vào cơ sở dữ liệu
  product.save()
  .then(() => {
    console.log("Sản phẩm đã được thêm vào cơ sở dữ liệu.");
    res.redirect('/');
  })
  .catch(error => {
    console.error("Lỗi khi lưu sản phẩm:", error);
    // In ra lỗi chi tiết hơn
    if (error.name === 'ValidationError') {
      // Nếu có lỗi validation từ Mongoose
      console.error("Validation errors:", error.errors);
      res.status(400).json({ errors: error.errors });
    } else {
      // Lỗi khác
      res.status(500).send("Đã xảy ra lỗi khi thêm sản phẩm.");
    }
  });

}




  //[PUT] /products/:id
  update(req, res, next) {
    Products.updateOne({ _id: req.params.id }, req.body)
      .then(() => res.redirect('/me/stored/courses'))
      .catch(next);
  }


  //[DELETE] /products/:id
  destroy(req, res, next) {
    Products.deleteOne({ _id: req.params.id })
      .then(() => res.redirect('back'))
      .catch(next);
  }
}

module.exports = new ProductsController();
