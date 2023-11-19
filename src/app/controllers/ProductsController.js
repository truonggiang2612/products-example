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
    const { name, description, price } = req.body;

    // Tạo một đối tượng mới của model Products
    const product = new Products({
      name: name,
      description: description,
      price: price
      // Bạn có thể thêm các trường khác nếu cần
    });

    // Lưu đối tượng product vào cơ sở dữ liệu
    product.save()
      .then(() => {
        console.log("Sản phẩm đã được thêm vào cơ sở dữ liệu.");
        // Chuyển hướng người dùng về trang chủ hoặc trang quản lý sản phẩm
        res.redirect('/');
      })
      .catch(error => {
        console.log("Lỗi------------------>" + error);
        // Xử lý lỗi nếu có
        // Hiển thị thông báo lỗi hoặc chuyển hướng đến trang lỗi
        res.status(500).send("Đã xảy ra lỗi khi thêm sản phẩm.");
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
