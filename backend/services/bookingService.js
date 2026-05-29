const Booking = require("../models/Booking");
const Room = require("../models/Room");

const createBooking = async (userId, bookingData) => {
  const { roomId, hotelId, checkInDate, checkOutDate, guests } = bookingData;

  const room = await Room.findById(roomId);

  if (!room) {
    throw new Error("Room not found");
  }

  const start = new Date(checkInDate);

  const end = new Date(checkOutDate);

  const nights = Math.ceil((end - start) / (1000 * 60 * 60 * 24));

  const totalAmount = room.price * nights;

  const existing = await Booking.findOne({
    roomId,
    bookingStatus: {
      $in: ["Pending", "Confirmed"],
    },
    checkInDate: {
      $lt: end,
    },
    checkOutDate: {
      $gt: start,
    },
  });

  if (existing) {
    throw new Error("Room already booked");
  }

  return Booking.create({
    userId,
    hotelId,
    roomId,
    checkInDate,
    checkOutDate,
    guests,
    totalAmount,
    bookingStatus: "Pending",
  });
};

const myBookings = async (userId) => {
  return Booking.find({ userId }).populate("hotelId").populate("roomId");
};

const bookingById = async (id) => {
  return Booking.findById(id)
    .populate("hotelId")
    .populate("roomId")
    .populate("userId", "name email");
};

const deleteBooking = async (id) => {
  return Booking.findByIdAndDelete(id);
};

const allBookings = async () => {
  return Booking.find()
    .populate("hotelId")
    .populate("roomId")
    .populate("userId", "name email");
};

const changeBookingStatus = async (id, status) => {
  return Booking.findByIdAndUpdate(
    id,
    {
      bookingStatus: status,
    },
    {
      new: true,
    },
  );
};

module.exports = {
  createBooking,
  myBookings,
  bookingById,
  deleteBooking,
  allBookings,
  changeBookingStatus,
};
