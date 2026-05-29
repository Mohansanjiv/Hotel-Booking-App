const Room = require("../models/Room");

class RoomService {
  async create(data) {
    return Room.create(data);
  }

  async getAll() {
    return Room.find().populate("hotelId");
  }

  async getById(id) {
    return Room.findById(id);
  }

  async getByHotel(hotelId) {
    return Room.find({
      hotelId,
      availability: true,
    });
  }

  async update(id, data) {
    return Room.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id) {
    return Room.findByIdAndDelete(id);
  }
}

module.exports = new RoomService();
