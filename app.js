const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
const orderRoutes = require("./src/routes/order-routes");
const productRoutes = require("./src/routes/product-routes");

const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());

app.use("/api/orders", orderRoutes);
app.use("/api/products", productRoutes);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({ status: false, message: err.message });
});

app.listen(process.env.PORT, () => {
  console.log("Server running on port " + process.env.PORT);
});
