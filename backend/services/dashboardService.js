const Booking = require("../models/Booking");
const Hotel = require("../models/Hotel");
const User = require("../models/User");
const Payment = require("../models/Payment");

const getStatsService = async () => {
  const totalUsers = await User.countDocuments();

  const totalHotels = await Hotel.countDocuments();

  const totalBookings = await Booking.countDocuments();

  const totalPayments = await Payment.countDocuments();

  const revenueResult = await Payment.aggregate([
    {
      $match: {
        paymentStatus: "Completed",
      },
    },
    {
      $group: {
        _id: null,
        totalRevenue: {
          $sum: "$amount",
        },
      },
    },
  ]);

  const totalRevenue =
    revenueResult.length > 0 ? revenueResult[0].totalRevenue : 0;

  return {
    totalUsers,
    totalHotels,
    totalBookings,
    totalPayments,
    totalRevenue,
  };
};

const getBookingAnalyticsService = async () => {
  return Booking.aggregate([
    {
      $group: {
        _id: "$bookingStatus",
        total: {
          $sum: 1,
        },
      },
    },
  ]);
};

const getRevenueAnalyticsService = async () => {
  return Payment.aggregate([
    {
      $match: {
        paymentStatus: "Completed",
      },
    },
    {
      $group: {
        _id: {
          month: {
            $month: "$createdAt",
          },
          year: {
            $year: "$createdAt",
          },
        },
        revenue: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        "_id.year": 1,
        "_id.month": 1,
      },
    },
  ]);
};

module.exports = {
  getStatsService,
  getBookingAnalyticsService,
  getRevenueAnalyticsService,
};
