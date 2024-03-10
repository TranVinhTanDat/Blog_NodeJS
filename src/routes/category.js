// routes/category.js

const express = require('express');
const router = express.Router();
const categoryController = require('../app/controllers/CategoryController ');

// Tạo mới danh mục sản phẩm
router.post('/create', categoryController.createCategory);

// Lấy tất cả danh mục sản phẩm
router.get('/', categoryController.getAllCategories);

// Lấy danh mục sản phẩm dựa trên ID
router.get('/:id', categoryController.getCategoryById);

// Cập nhật danh mục sản phẩm
router.put('/update/:id', categoryController.updateCategory);

// Xóa danh mục sản phẩm
router.delete('/delete:id', categoryController.deleteCategory);

// Xóa danh mục con
router.delete('/delete/subcategory/:id', categoryController.deleteSubCategory);

// Cập nhật danh mục con
router.delete('/update/subcategory/:id', categoryController.updateSubCategory);
module.exports = router;
