const Room = require("../models/Room");

const createRoom = async (data) => {
  try {
    return await Room.create(data);
  } catch (error) {
    throw new Error(`Failed to create room: ${error.message}`);
  }
};

const getAllRooms = async () => {
  const rooms = await Room.find().populate("hotelId");

  if (!rooms.length) {
    throw new Error("No rooms found");
  }

  return rooms;
};

const getRoomById = async (id) => {
  const room = await Room.findById(id);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

const getRoomsByHotel = async (hotelId) => {
  const rooms = await Room.find({
    hotelId,
    availability: true,
  });

  if (!rooms.length) {
    throw new Error("No available rooms found for this hotel");
  }

  return rooms;
};

const updateRoom = async (id, data) => {
  const room = await Room.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

const deleteRoom = async (id) => {
  const room = await Room.findByIdAndDelete(id);

  if (!room) {
    throw new Error("Room not found");
  }

  return room;
};

module.exports = {
  createRoom,
  getAllRooms,
  getRoomById,
  getRoomsByHotel,
  updateRoom,
  deleteRoom,
};
