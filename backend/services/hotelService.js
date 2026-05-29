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
    return Hotel.findById(id);
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
