// controllers/OrderController.js

const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User'); // Thêm lệnh require cho model User
const sendEmail = require('../middlewares/sendEmail');
const hashPasswordMiddleware = require('../middlewares/hashPassword');


const OrderController = {
  async createOrder(req, res) {
    try {
        const { products } = req.body;
        const userId = req.user.userId;
        const user = await User.findById(userId);
        const userEmail = user.email;

        let totalPrice = 0;
        for (const productId of products) {
            const product = await Product.findById(productId);
            if (product) {
                totalPrice += product.price;
            }
        }
        
        const newOrder = new Order({ products, user: userId, totalPrice });
        await newOrder.save();

        const subject = 'Order Confirmation';
        const message = `Your order has been created successfully. Total price: ${totalPrice}`;
        await sendEmail(userEmail, subject, message);

        res.status(201).json({ message: 'Order created successfully', order: newOrder });
    } catch (error) {
        console.error('Error creating order:', error);
        res.status(500).json({ message: error.message });
    }
  },

  async getAllOrders(req, res) {
    try {
      const orders = await Order.find().populate("products").populate("user");
      res.status(200).json(orders);
    } catch (error) {
      console.error("Error getting orders:", error);
      res.status(500).json({ message: error.message });
    }
  },

  async updateOrder(req, res) {
    try {
      const orderId = req.params.id;
      const { status } = req.body;
      const updatedOrder = await Order.findByIdAndUpdate(
        orderId,
        { status },
        { new: true }
      );
      if (!updatedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res
        .status(200)
        .json({ message: "Order updated successfully", order: updatedOrder });
    } catch (error) {
      console.error("Error updating order:", error);
      res.status(500).json({ message: error.message });
    }
  },


  async deleteOrder(req, res) {
    try {
      const orderId = req.params.id;
      const deletedOrder = await Order.findByIdAndDelete(orderId);
      if (!deletedOrder) {
        return res.status(404).json({ message: "Order not found" });
      }
      res.status(200).json({ message: "Order deleted successfully" });
    } catch (error) {
      console.error("Error deleting order:", error);
      res.status(500).json({ message: error.message });
    }
  },

};

module.exports = OrderController;
