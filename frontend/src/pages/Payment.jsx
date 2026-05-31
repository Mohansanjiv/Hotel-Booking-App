import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
  Alert,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";

import BookingStepper from "../components/BookingStepper";

function Payment() {
  const { bookingId } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  const [processing, setProcessing] = useState(false);

  const [error, setError] = useState("");

  const [paymentData, setPaymentData] = useState({
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
  });

  useEffect(() => {
    fetchBooking();
  }, []);

  const fetchBooking = async () => {
    try {
      const { data } = await api.get(`/bookings/${bookingId}`);

      setBooking(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setPaymentData({
      ...paymentData,
      [e.target.name]: e.target.value,
    });
  };

  const handlePayment = async () => {
    try {
      setProcessing(true);
      setError("");

      const { data } = await api.post("/payments", {
        bookingId,
        amount: booking.totalAmount,
      });

      navigate(`/booking-success/${bookingId}`);
    } catch (error) {
      setError(error.response?.data?.message || "Payment Failed");
    } finally {
      setProcessing(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <BookingStepper activeStep={2} />

      <Grid container spacing={4}>
        {/* Payment Form */}

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Payment Details
            </Typography>

            {error && (
              <Alert severity="error" sx={{ mb: 2 }}>
                {error}
              </Alert>
            )}

            <TextField
              fullWidth
              label="Card Holder Name"
              name="cardHolder"
              margin="normal"
              value={paymentData.cardHolder}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Card Number"
              name="cardNumber"
              margin="normal"
              value={paymentData.cardNumber}
              onChange={handleChange}
            />

            <Grid container spacing={2}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="MM/YY"
                  name="expiryDate"
                  margin="normal"
                  value={paymentData.expiryDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="CVV"
                  name="cvv"
                  margin="normal"
                  value={paymentData.cvv}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={handlePayment}
              disabled={processing}
            >
              {processing ? "Processing..." : "Pay Now"}
            </Button>
          </Paper>
        </Grid>

        {/* Summary */}

        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Booking Summary
            </Typography>

            <Typography>Hotel: {booking.hotelId?.hotelName}</Typography>

            <Typography>Room: {booking.roomId?.roomType}</Typography>

            <Typography>
              Check In: {new Date(booking.checkInDate).toLocaleDateString()}
            </Typography>

            <Typography>
              Check Out: {new Date(booking.checkOutDate).toLocaleDateString()}
            </Typography>

            <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
              ₹{booking.totalAmount}
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Payment;
