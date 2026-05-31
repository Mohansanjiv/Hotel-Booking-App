const dashboardService = require("../services/dashboardService");

const stats = async (req, res) => {
  try {
    const data = await dashboardService.getStatsService();

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const bookingAnalytics = async (req, res) => {
  try {
    const analytics = await dashboardService.getBookingAnalyticsService();

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const revenueAnalytics = async (req, res) => {
  try {
    const analytics = await dashboardService.getRevenueAnalyticsService();

    res.status(200).json({
      success: true,
      analytics,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};
const userDashboardStats = async (req, res) => {
  try {
    const data = await dashboardService.getUserDashboardStatsService(
      req.user._id,
    );

    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  stats,
  bookingAnalytics,
  revenueAnalytics,
  userDashboardStats,
};
