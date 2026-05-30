import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Chip,
  CircularProgress,
  Box,
} from "@mui/material";

import {
  Hotel,
  MeetingRoom,
  BookOnline,
  CurrencyRupee,
} from "@mui/icons-material";

import api from "../api/axios";

function AdminDashboard() {
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalHotels: 0,
    totalRooms: 0,
    totalBookings: 0,
    totalRevenue: 0,
  });

  const [hotels, setHotels] = useState([]);

  const [rooms, setRooms] = useState([]);

  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard/admin");

      setStats(data.stats);

      setHotels(data.hotels || []);

      setRooms(data.rooms || []);

      setBookings(data.bookings || []);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const statusColor = (status) => {
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
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Admin Dashboard
      </Typography>

      {/* Statistics Cards */}

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={4}>
            <CardContent>
              <Hotel color="primary" fontSize="large" />

              <Typography>Total Hotels</Typography>

              <Typography variant="h4" fontWeight="bold">
                {stats.totalHotels}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={4}>
            <CardContent>
              <MeetingRoom color="secondary" fontSize="large" />

              <Typography>Total Rooms</Typography>

              <Typography variant="h4" fontWeight="bold">
                {stats.totalRooms}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={4}>
            <CardContent>
              <BookOnline color="success" fontSize="large" />

              <Typography>Bookings</Typography>

              <Typography variant="h4" fontWeight="bold">
                {stats.totalBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card elevation={4}>
            <CardContent>
              <CurrencyRupee color="warning" fontSize="large" />

              <Typography>Revenue</Typography>

              <Typography variant="h4" fontWeight="bold">
                ₹{stats.totalRevenue}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Hotels Table */}

      <Paper
        elevation={4}
        sx={{
          p: 2,
          mb: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Hotel Management
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hotel Name</TableCell>

                <TableCell>City</TableCell>

                <TableCell>Rating</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {hotels.map((hotel) => (
                <TableRow key={hotel._id}>
                  <TableCell>{hotel.name}</TableCell>

                  <TableCell>{hotel.city}</TableCell>

                  <TableCell>{hotel.rating}</TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{
                        mr: 1,
                      }}
                    >
                      Edit
                    </Button>

                    <Button size="small" color="error" variant="contained">
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Rooms Table */}

      <Paper
        elevation={4}
        sx={{
          p: 2,
          mb: 4,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Room Management
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Room</TableCell>

                <TableCell>Type</TableCell>

                <TableCell>Price</TableCell>

                <TableCell>Available</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room._id}>
                  <TableCell>{room.roomNumber}</TableCell>

                  <TableCell>{room.roomType}</TableCell>

                  <TableCell>₹{room.price}</TableCell>

                  <TableCell>
                    <Chip
                      label={room.isAvailable ? "Available" : "Booked"}
                      color={room.isAvailable ? "success" : "error"}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

      {/* Recent Bookings */}

      <Paper elevation={4} sx={{ p: 2 }}>
        <Typography variant="h6" gutterBottom>
          Recent Bookings
        </Typography>

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>

                <TableCell>Hotel</TableCell>

                <TableCell>Check In</TableCell>

                <TableCell>Amount</TableCell>

                <TableCell>Status</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {bookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.userId?.name}</TableCell>

                  <TableCell>{booking.hotelId?.name}</TableCell>

                  <TableCell>
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>₹{booking.totalAmount}</TableCell>

                  <TableCell>
                    <Chip
                      label={booking.bookingStatus}
                      color={statusColor(booking.bookingStatus)}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Container>
  );
}

export default AdminDashboard;
