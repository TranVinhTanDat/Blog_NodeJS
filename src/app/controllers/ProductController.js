// controllers/ProductController.js

const Product = require('../models/Product');
const Category = require('../models/Category');

const ProductController = {
    async getAllProducts(req, res) {
        try {
            const products = await Product.find();
            res.status(200).json(products);
        } catch (error) {
            console.error('Error getting products:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async getProductById(req, res) {
        try {
            const productId = req.params.id;
            const product = await Product.findById(productId);
            if (!product) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json(product);
        } catch (error) {
            console.error('Error getting product by ID:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async createProduct(req, res) {
        try {
            const { name, description, price, categoryId, imageUrl } = req.body;
            const category = await Category.findById(categoryId);
            if (!category) {
                return res.status(404).json({ message: 'Category not found' });
            }

            const newProduct = new Product({ name, description, price, category, imageUrl });
            await newProduct.save();

            res.status(201).json({ message: 'Product created successfully', product: newProduct });
        } catch (error) {
            console.error('Error creating product:', error);
            res.status(500).json({ message: error.message });
        }
    },
    

    async updateProduct(req, res) {
        try {
            const productId = req.params.id;
            const { name, description, price, category } = req.body;
            const updatedProduct = await Product.findByIdAndUpdate(productId, { name, description, price, category }, { new: true });
            if (!updatedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product updated successfully', product: updatedProduct });
        } catch (error) {
            console.error('Error updating product:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async deleteProduct(req, res) {
        try {
            const productId = req.params.id;
            const deletedProduct = await Product.findByIdAndDelete(productId);
            if (!deletedProduct) {
                return res.status(404).json({ message: 'Product not found' });
            }
            res.status(200).json({ message: 'Product deleted successfully' });
        } catch (error) {
            console.error('Error deleting product:', error);
            res.status(500).json({ message: error.message });
        }
    },

    async getProductsByCategory(req, res) {
        try {
            const category = req.params.category;
            const products = await Product.find({ category: category });
            res.status(200).json(products);
        } catch (error) {
            console.error('Error getting products by category:', error);
            res.status(500).json({ message: error.message });
        }
    },

    // Tìm kiếm sản phẩm theo từ khóa
    async searchProducts(req, res) {
        try {
            const { keyword } = req.query;
            const products = await Product.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }, // Tìm kiếm theo tên sản phẩm (không phân biệt chữ hoa chữ thường)
                    { description: { $regex: keyword, $options: 'i' } } // Tìm kiếm theo mô tả sản phẩm (không phân biệt chữ hoa chữ thường)
                ]
            });
            res.status(200).json(products);
        } catch (error) {
            console.error('Error searching products:', error);
            res.status(500).json({ message: error.message });
        }
    },

    // Lấy danh sách sản phẩm theo danh mục
    async getSearchProductsByCategory(req, res) {
        try {
            const { keyword } = req.query;
            const products = await Product.find({
                $or: [
                    { name: { $regex: keyword, $options: 'i' } }, // Tìm kiếm theo tên sản phẩm (không phân biệt chữ hoa chữ thường)
                    { description: { $regex: keyword, $options: 'i' } } // Tìm kiếm theo mô tả sản phẩm (không phân biệt chữ hoa chữ thường)
                ]
            });
            res.status(200).json(products);
        } catch (error) {
            console.error('Error getting products by category:', error);
            res.status(500).json({ message: error.message });
        }
    },
    // Lấy danh sách sản phẩm trong một khoảng giá cụ thể
    async getProductsByPriceRange(req, res) {
        try {
            const { keyword } = req.query;
            // Chuyển đổi keyword sang kiểu số
            const price = parseFloat(keyword);
            // Tìm kiếm các sản phẩm có giá lớn hơn hoặc bằng giá trị price
            const products = await Product.find({ price: { $gte: price } });
            res.status(200).json(products);
        } catch (error) {
            console.error('Error getting products by price range:', error);
            res.status(500).json({ message: error.message });
        }
    }


};

module.exports = ProductController;
