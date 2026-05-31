const Hotel = require("../models/Hotel");

class HotelService {
  async create(data) {
    return Hotel.create(data);
  }

  async getAll(filters) {
    const query = {};

    if (filters.city) {
      query.city = {
        $regex: filters.city,
        $options: "i",
      };
    }

    return Hotel.find(query);
  }

  async search({ city, guests }) {
    const query = {};

    if (city) {
      query.city = {
        $regex: city,
        $options: "i",
      };
    }

    return Hotel.find(query);
  }

  async getById(id) {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      throw new Error("Hotel not found");
    }

    const rooms = await Room.find({
      hotelId: id,
    });

    return {
      ...hotel.toObject(),
      rooms,
    };
  }

  async update(id, data) {
    return Hotel.findByIdAndUpdate(id, data, {
      new: true,
    });
  }

  async delete(id) {
    return Hotel.findByIdAndDelete(id);
  }
}

module.exports = new HotelService();
