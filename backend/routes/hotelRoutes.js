const express = require("express");

const router = express.Router();

const {
  createHotel,
  getHotelById,
  updateHotel,
  deleteHotel,
  getHotels,
} = require("../controllers/hotelController");
const protect = require("../middleware/authMiddleware");
const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getHotels);

router.get("/:id", getHotelById);

router.post("/", protect, adminOnly, createHotel);

router.put("/:id", protect, adminOnly, updateHotel);

router.delete("/:id", protect, adminOnly, deleteHotel);

module.exports = router;
