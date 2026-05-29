const paymentService = require("../services/paymentService");

const createPayment = async (req, res) => {
  try {
    const payment = await paymentService.createPaymentService(
      req.user._id,
      req.body,
    );

    res.status(201).json({
      success: true,
      message: "Payment created successfully",
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const verifyPayment = async (req, res) => {
  try {
    const payment = await paymentService.verifyPaymentService(
      req.body.paymentId,
      req.body.paymentStatus,
    );

    res.status(200).json({
      success: true,
      message: "Payment verified successfully",
      payment,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getPayment = async (req, res) => {
  try {
    const payment = await paymentService.getPaymentService(req.params.id);

    if (!payment) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }

    res.status(200).json({
      success: true,
      payment,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = {
  createPayment,
  verifyPayment,
  getPayment,
};
