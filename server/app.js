const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// endpointai
const userRouter = require("./routers/user.router");
// const appointmentRouter = require("./routers/appointment.router");
// const menuRouter = require("./routers/menu.router");
// const categoryRouter = require("./routers/category.router");
// const orderRouter = require("./routers/order.router");

// klaidos
const errorsMiddleware = require("./middlewares/error.middleware");

const app = express();

// Midlvares visokios
app.use(express.json());
app.use(
  cors({
    // Dėl slapukų ir cross-origin resource share
    // turi būti nurodomas fronto URL
    credentials: true,
    origin: process.env.CLIENT_URL,
  })
);
app.use(cookieParser());

app.use("/api/v1/users", userRouter);
//app.use("/api/v1/appointment", appointmentRouter);
//app.use("/api/v1/menu", menuRouter);
//app.use("/api/v1/category", categoryRouter);
//app.use("/api/v1/orders", orderRouter);

// sitoj eilej klaidos turi buti paskutines
app.use(errorsMiddleware);

module.exports = app;
