const Order = require("../db/order-db");

exports.getProducts = async (req, res, next) => {
  try {
    let products = await Order.fetchAllProducts();
    res.status(200).json({ status: true, products });
  } catch (error) {
    throw error;
  }
};
