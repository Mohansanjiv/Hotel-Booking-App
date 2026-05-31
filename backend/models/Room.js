const mongoose = require("mongoose");

const roomSchema = new mongoose.Schema(
  {
    hotelId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Hotel",
      required: true,
    },

    roomName: {
      type: String,
    },
    roomNumber: {
      type: String,
      required: true,
    },

    roomType: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
    },

    capacity: {
      type: Number,
      required: true,
    },

    availability: {
      type: Boolean,
      default: true,
    },

    images: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  },
);

module.exports = mongoose.model("Room", roomSchema);
