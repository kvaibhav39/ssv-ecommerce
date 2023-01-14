const Order = require("../db/order-db");

exports.getOrders = async (req, res, next) => {
  try {
    let orders = await Order.fetchAll();
    res.status(200).json({ status: true, orders });
  } catch (error) {
    throw error;
  }
};

exports.createOrder = async (req, res, next) => {
  const orderDescription = req.body.orderDescription;
  const productIds = req.body.productIds;
  const order = new Order(null, orderDescription, null, productIds);
  try {
    await order.save();
    res
      .status(201)
      .json({ status: true, message: "Order created successfully." });
  } catch (error) {
    next(error);
  }
};

exports.updateOrder = async (req, res, next) => {
  try {
    const orderData = {
      id: req.params.id,
      orderDescription: req.body.orderDescription,
    };
    await Order.update(orderData);
    res
      .status(200)
      .json({ status: true, message: "Order updated successfully." });
  } catch (error) {
    next(error);
  }
};

exports.deleteOrder = async (req, res, next) => {
  try {
    await Order.deleteById(req.params.id);
    res
      .status(200)
      .json({ status: true, message: "Order deleted successfully." });
  } catch (error) {
    next(error);
  }
};

exports.getOrderById = async (req, res, next) => {
  try {
    let order = await Order.findById(req.params.id);
    res.status(200).json({ status: true, order });
  } catch (error) {
    next(error);
  }
};
