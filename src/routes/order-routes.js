const express = require("express");
const orderController = require("../controllers/order-controller");
const router = express.Router();

router.get("/", orderController.getOrders);
router.post("/", orderController.createOrder);
router.put("/:id", orderController.updateOrder);
router.delete("/:id", orderController.deleteOrder);
router.get("/:id", orderController.getOrderById);

module.exports = router;
