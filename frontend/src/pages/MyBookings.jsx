import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Card,
  CardContent,
  Grid,
  Box,
  Chip,
  Button,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider,
  Alert,
} from "@mui/material";

import { Hotel, CalendarMonth, Payments } from "@mui/icons-material";

import api from "../api/axios";

function MyBookings() {
  const [bookings, setBookings] = useState([]);

  const [loading, setLoading] = useState(true);

  const [selectedBooking, setSelectedBooking] = useState(null);

  const [open, setOpen] = useState(false);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const { data } = await api.get("/bookings/my");

      setBookings(data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetails = (booking) => {
    setSelectedBooking(booking);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCancelBooking = async (id) => {
    try {
      await api.put(`/bookings/${id}/cancel`);

      setBookings((prev) =>
        prev.map((booking) =>
          booking._id === id
            ? {
                ...booking,
                bookingStatus: "Cancelled",
              }
            : booking,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "Confirmed":
        return "success";

      case "Pending":
        return "warning";

      case "Cancelled":
        return "error";

      case "Completed":
        return "info";

      default:
        return "default";
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={8}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        My Bookings
      </Typography>

      {bookings.length === 0 ? (
        <Alert severity="info">No bookings found.</Alert>
      ) : (
        <Grid container spacing={3}>
          {bookings.map((booking) => (
            <Grid item xs={12} key={booking._id}>
              <Card elevation={3}>
                <CardContent>
                  <Grid container spacing={3} alignItems="center">
                    <Grid item xs={12} md={4}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Hotel />
                        <Typography variant="h6">
                          {booking.hotelId?.name}
                        </Typography>
                      </Box>

                      <Typography color="text.secondary">
                        {booking.hotelId?.city}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <CalendarMonth />
                        <Typography>
                          {new Date(booking.checkInDate).toLocaleDateString()}
                        </Typography>
                      </Box>

                      <Typography>To</Typography>

                      <Typography>
                        {new Date(booking.checkOutDate).toLocaleDateString()}
                      </Typography>
                    </Grid>

                    <Grid item xs={12} md={2}>
                      <Box display="flex" alignItems="center" gap={1}>
                        <Payments />
                        <Typography fontWeight="bold">
                          ₹{booking.totalAmount}
                        </Typography>
                      </Box>
                    </Grid>

                    <Grid item xs={12} md={3}>
                      <Chip
                        label={booking.bookingStatus}
                        color={getStatusColor(booking.bookingStatus)}
                        sx={{
                          mb: 1,
                        }}
                      />

                      <Box display="flex" gap={1} mt={1}>
                        <Button
                          variant="outlined"
                          size="small"
                          onClick={() => handleViewDetails(booking)}
                        >
                          View
                        </Button>

                        {booking.bookingStatus !== "Cancelled" && (
                          <Button
                            variant="contained"
                            color="error"
                            size="small"
                            onClick={() => handleCancelBooking(booking._id)}
                          >
                            Cancel
                          </Button>
                        )}
                      </Box>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Details Dialog */}

      <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth>
        <DialogTitle>Booking Details</DialogTitle>

        <DialogContent>
          {selectedBooking && (
            <>
              <Typography>
                <strong>Hotel:</strong> {selectedBooking.hotelId?.name}
              </Typography>

              <Typography>
                <strong>Room:</strong> {selectedBooking.roomId?.roomType}
              </Typography>

              <Typography>
                <strong>Guests:</strong> {selectedBooking.guests}
              </Typography>

              <Typography>
                <strong>Check-In:</strong>{" "}
                {new Date(selectedBooking.checkInDate).toLocaleDateString()}
              </Typography>

              <Typography>
                <strong>Check-Out:</strong>{" "}
                {new Date(selectedBooking.checkOutDate).toLocaleDateString()}
              </Typography>

              <Typography>
                <strong>Amount:</strong> ₹{selectedBooking.totalAmount}
              </Typography>

              <Divider sx={{ my: 2 }} />

              <Chip
                label={selectedBooking.bookingStatus}
                color={getStatusColor(selectedBooking.bookingStatus)}
              />
            </>
          )}
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default MyBookings;
