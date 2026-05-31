const express = require("express");

const cors = require("cors");

const dotenv = require("dotenv");

const morgan = require("morgan");

const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");

const hotelRoutes = require("./routes/hotelRoutes");

const roomRoutes = require("./routes/roomRoutes");

const bookingRoutes = require("./routes/bookingRoutes");

const paymentRoutes = require("./routes/paymentRoutes");

const dashboardRoutes = require("./routes/dashboardRoutes");

const notFound = require("./middleware/notFound");

const errorHandler = require("./middleware/errorMiddleware");

dotenv.config();

connectDB();

const app = express();

app.use(cors());

app.use(express.json());

app.use(
  express.urlencoded({
    extended: true,
  }),
);

app.use(morgan("dev"));

app.use("/uploads", express.static("uploads"));

app.use("/api/auth", authRoutes);

app.use("/api/hotels", hotelRoutes);

app.use("/api/rooms", roomRoutes);

app.use("/api/bookings", bookingRoutes);

app.use("/api/payments", paymentRoutes);

app.use("/api/dashboard", dashboardRoutes);

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Hotel Booking API Running",
  });
});

app.use(notFound);

app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server Running On Port ${PORT}`);
});
