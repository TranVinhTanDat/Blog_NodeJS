// controllers/cart/CartController.js

const User = require('../models/User'); // Thêm lệnh require cho model User
const Product = require('../models/Product');
const Cart = require('../models/Cart'); // Thêm lệnh require cho mô hình Cart

const CartController = {

  // Thêm sản phẩm vào giỏ hàng
  async addToCart(req, res) {
    try {
      const { productId } = req.body;
      const userId = req.user.userId;

      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      let userCart = await Cart.findOne({ user: userId });
      if (!userCart) {
        userCart = new Cart({ user: userId, products: [] });
      }

      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }

      userCart.products.push(product._id); // Thêm product._id vào mảng
      await userCart.save();

      res.status(200).json({ message: "Product added to cart successfully" });
    } catch (error) {
      console.error("Error adding product to cart:", error);
      res.status(500).json({ message: error.message });
    }
  },

async getCart(req, res) {
  try {
    const userId = req.user.userId;
    const userCart = await Cart.findOne({ user: userId }).populate("products");
    if (!userCart) {
      return res.status(404).json({ message: "User cart not found" });
    }
    res.status(200).json(userCart.products);
  } catch (error) {
    console.error("Error getting user cart:", error);
    res.status(500).json({ message: error.message });
  }
}
};

module.exports = CartController;
