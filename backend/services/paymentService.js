const Payment = require("../models/Payment");
const Booking = require("../models/Booking");

const createPaymentService = async (userId, paymentData) => {
  const { bookingId, amount, paymentMethod } = paymentData;

  const booking = await Booking.findById(bookingId);

  if (!booking) {
    throw new Error("Booking not found");
  }

  const payment = await Payment.create({
    bookingId,
    amount,
    paymentMethod,
    transactionId: `TXN${Date.now()}`,
    paymentStatus: "Success",
  });

  return payment;
};

const verifyPaymentService = async (paymentId, paymentStatus) => {
  const payment = await Payment.findById(paymentId);

  if (!payment) {
    throw new Error("Payment not found");
  }

  payment.paymentStatus = paymentStatus;

  await payment.save();

  if (paymentStatus === "Completed") {
    await Booking.findByIdAndUpdate(payment.bookingId, {
      bookingStatus: "Confirmed",
    });
  }

  return payment;
};

const getPaymentService = async (id) => {
  return Payment.findById(id)
    .populate("userId", "name email")
    .populate("bookingId");
};

module.exports = {
  createPaymentService,
  verifyPaymentService,
  getPaymentService,
};
