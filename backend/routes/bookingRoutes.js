const express = require("express");

const router = express.Router();

const {
  createBookingCtrl,
  getMyBookingsCtrl,
  getBookingById,
  cancelBooking,
  getAllBookings,
  updateBookingStatus,
} = require("../controllers/bookingController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

router.post("/", protect, createBookingCtrl);

router.get("/my", protect, getMyBookingsCtrl);

router.get("/admin/all", protect, adminOnly, getAllBookings);

router.put("/:id/status", protect, adminOnly, updateBookingStatus);

router.get("/:id", protect, getBookingById);

router.delete("/:id", protect, cancelBooking);

router.patch("/admin/:id", protect, adminOnly, updateBookingStatus);

module.exports = router;
