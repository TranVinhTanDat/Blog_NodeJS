// routes/product.js

const express = require('express');
const router = express.Router();
const productController = require('../app/controllers/ProductController');

// Tìm kiếm sản phẩm theo từ khóa
router.get('/search', productController.searchProducts);

// Lấy danh sách sản phẩm theo danh mục
router.get('/category/:category', productController.getProductsByCategory);

// Lấy danh sách sản phẩm theo danh mục (tìm kiếm theo danh mục)
router.get('/search/category', productController.getSearchProductsByCategory);

// Lấy danh sách sản phẩm trong một khoảng giá cụ thể
router.get('/search/price-range', productController.getProductsByPriceRange);

// Lấy chi tiết sản phẩm
router.get('/:id', productController.getProductById);

// Lấy danh sách sản phẩm
router.get('/', productController.getAllProducts);

// Tạo mới sản phẩm
router.post('/create', productController.createProduct);

// Cập nhật thông tin sản phẩm
router.put('/update/:id', productController.updateProduct);

// Xóa sản phẩm
router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;
