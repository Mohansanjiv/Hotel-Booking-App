import { useEffect, useState } from "react";

import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  CircularProgress,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";

import { useParams, useNavigate } from "react-router-dom";

import api from "../api/axios";

import BookingStepper from "../components/BookingStepper";

function BookingSuccess() {
  const { bookingId } = useParams();

  const navigate = useNavigate();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

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

  if (loading) {
    return (
      <Container sx={{ py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <BookingStepper activeStep={3} />

      <Paper
        elevation={4}
        sx={{
          p: 5,
          textAlign: "center",
          borderRadius: 3,
        }}
      >
        <CheckCircleIcon
          color="success"
          sx={{
            fontSize: 100,
            mb: 2,
          }}
        />

        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Booking Confirmed
        </Typography>

        <Typography color="text.secondary" mb={4}>
          Your payment was successful and your room has been booked.
        </Typography>

        <Box
          sx={{
            textAlign: "left",
            bgcolor: "#f5f5f5",
            p: 3,
            borderRadius: 2,
            mb: 4,
          }}
        >
          <Typography>
            <strong>Booking ID:</strong> {booking._id}
          </Typography>

          <Typography>
            <strong>Hotel:</strong> {booking.hotelId?.hotelName}
          </Typography>

          <Typography>
            <strong>Room:</strong> {booking.roomId?.roomType}
          </Typography>

          <Typography>
            <strong>Check-In:</strong>{" "}
            {new Date(booking.checkInDate).toLocaleDateString()}
          </Typography>

          <Typography>
            <strong>Check-Out:</strong>{" "}
            {new Date(booking.checkOutDate).toLocaleDateString()}
          </Typography>

          <Typography>
            <strong>Guests:</strong> {booking.guests}
          </Typography>

          <Typography variant="h6" color="primary" sx={{ mt: 2 }}>
            ₹{booking.totalAmount}
          </Typography>
        </Box>

        <Box display="flex" justifyContent="center" gap={2} flexWrap="wrap">
          <Button variant="contained" onClick={() => navigate("/my-bookings")}>
            My Bookings
          </Button>

          <Button variant="outlined" onClick={() => navigate("/")}>
            Back To Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default BookingSuccess;
