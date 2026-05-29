const hotelService = require("../services/hotelService");

exports.searchHotels = async (req, res, next) => {
  try {
    const hotels = await hotelService.search(req.query);

    res.json(hotels);
  } catch (error) {
    next(error);
  }
};

exports.createHotel = async (req, res, next) => {
  try {
    const hotel = await hotelService.create(req.body);

    res.status(201).json(hotel);
  } catch (error) {
    next(error);
  }
};

exports.getHotels = async (req, res, next) => {
  try {
    const hotels = await hotelService.getAll(req.query);

    res.json(hotels);
  } catch (error) {
    next(error);
  }
};
exports.getHotelById = async (req, res, next) => {
  try {
    res.json({ message: "Get hotel by ID" });
  } catch (error) {
    next(error);
  }
};

exports.updateHotel = async (req, res, next) => {
  try {
    res.json({ message: "Hotel updated" });
  } catch (error) {
    next(error);
  }
};

exports.deleteHotel = async (req, res, next) => {
  try {
    res.json({ message: "Hotel deleted" });
  } catch (error) {
    next(error);
  }
};
