import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Paper,
  Typography,
  TextField,
  Button,
  CircularProgress,
} from "@mui/material";

import { useNavigate, useParams } from "react-router-dom";

import api from "../api/axios";

import BookingStepper from "../components/BookingStepper";
import BookingSummary from "../components/BookingSummary";

function Booking() {
  const { roomId } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const [room, setRoom] = useState(null);

  const [hotel, setHotel] = useState(null);

  const [formData, setFormData] = useState({
    guestName: "",
    email: "",
    phone: "",
    checkInDate: "",
    checkOutDate: "",
    guests: 1,
  });

  useEffect(() => {
    fetchRoom();
  }, []);

  const fetchRoom = async () => {
    try {
      const { data } = await api.get(`/rooms/${roomId}`);

      setRoom(data.room);
      setHotel(data.hotel);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const calculateTotal = () => {
    if (!formData.checkInDate || !formData.checkOutDate || !room) return 0;

    const start = new Date(formData.checkInDate);

    const end = new Date(formData.checkOutDate);

    const diff = (end - start) / (1000 * 60 * 60 * 24);

    return diff > 0 ? diff * room.price : room.price;
  };

  const handleBooking = async () => {
    try {
      const { data } = await api.post("/bookings", {
        roomId,
        hotelId: hotel._id,
        ...formData,
        totalAmount: calculateTotal(),
      });

      navigate(`/payment/${data.booking._id}`);
    } catch (error) {
      console.log(error);
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
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <BookingStepper activeStep={1} />

      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Guest Details
            </Typography>

            <TextField
              fullWidth
              label="Guest Name"
              name="guestName"
              margin="normal"
              value={formData.guestName}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Email"
              name="email"
              margin="normal"
              value={formData.email}
              onChange={handleChange}
            />

            <TextField
              fullWidth
              label="Phone"
              name="phone"
              margin="normal"
              value={formData.phone}
              onChange={handleChange}
            />

            <Grid container spacing={2}>
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Check In"
                  name="checkInDate"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.checkInDate}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  type="date"
                  label="Check Out"
                  name="checkOutDate"
                  margin="normal"
                  InputLabelProps={{
                    shrink: true,
                  }}
                  value={formData.checkOutDate}
                  onChange={handleChange}
                />
              </Grid>
            </Grid>

            <TextField
              fullWidth
              type="number"
              label="Guests"
              name="guests"
              margin="normal"
              value={formData.guests}
              onChange={handleChange}
            />

            <Button
              variant="contained"
              size="large"
              sx={{ mt: 3 }}
              onClick={handleBooking}
            >
              Continue To Payment
            </Button>
          </Paper>
        </Grid>

        <Grid item xs={12} md={4}>
          <BookingSummary
            hotel={hotel}
            room={room}
            checkIn={formData.checkInDate}
            checkOut={formData.checkOutDate}
            guests={formData.guests}
            totalAmount={calculateTotal()}
            buttonText="Continue"
            onProceed={handleBooking}
          />
        </Grid>
      </Grid>
    </Container>
  );
}

export default Booking;
