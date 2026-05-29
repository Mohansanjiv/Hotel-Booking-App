const express = require("express");

const router = express.Router();

const {
  stats,
  bookingAnalytics,
  revenueAnalytics,
} = require("../controllers/dashboardController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

router.get("/stats", protect, adminOnly, stats);

router.get("/bookings", protect, adminOnly, bookingAnalytics);

router.get("/revenue", protect, adminOnly, revenueAnalytics);

module.exports = router;
