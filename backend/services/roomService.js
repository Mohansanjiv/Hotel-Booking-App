const Room = require("../models/Room");

const createRoom = async (data) => {
  return await Room.create(data);
};

const getAllRooms = async () => {
  return await Room.find().populate("hotelId");
};

const getRoomById = async (id) => {
  return await Room.findById(id);
};

const getRoomsByHotel = async (hotelId) => {
  return await Room.find({
    hotelId,
    availability: true,
  });
};

const updateRoom = async (id, data) => {
  return await Room.findByIdAndUpdate(id, data, {
    new: true,
  });
};

const deleteRoom = async (id) => {
  return await Room.findByIdAndDelete(id);
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
};
