const express = require("express");

const router = express.Router();

const {
  createRoom,
  getRooms,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  updateAvailability,
  deleteRoom,
} = require("../controllers/roomController");

const protect = require("../middleware/authMiddleware");

const adminOnly = require("../middleware/adminMiddleware");

router.get("/", getRooms);

router.get("/:id", getRoomById);

router.get("/hotel/:hotelId", getRoomsByHotel);

router.post("/", protect, adminOnly, createRoom);

router.put("/:id", protect, adminOnly, updateRoom);

router.patch("/:id/availability", protect, adminOnly, updateAvailability);

router.delete("/:id", protect, adminOnly, deleteRoom);

module.exports = router;
