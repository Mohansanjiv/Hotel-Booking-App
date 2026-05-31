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
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
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
  console.log("rooms", rooms);

  const [bookings, setBookings] = useState([]);
  const [open, setOpen] = useState(false);

  const [editingHotel, setEditingHotel] = useState(null);

  const [formData, setFormData] = useState({
    hotelName: "",
    city: "",
    address: "",
    description: "",
    starRating: "",
  });

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const statsRes = await api.get("/dashboard/stats");

      const hotelsRes = await api.get("/hotels");
      const roomsRes = await api.get("/rooms");
      const bookingsRes = await api.get("/bookings/admin/all");
      const hotels = hotelsRes.data.data || [];
      const rooms = roomsRes.data.data || [];
      const bookings = bookingsRes.data.data || bookingsRes.data.bookings || [];

      setHotels(hotels);
      setRooms(rooms);
      setBookings(bookings);

      setStats({
        totalHotels: hotels.length,
        totalRooms: rooms.length,
        totalBookings: bookings.length,
        totalRevenue: bookings.reduce(
          (sum, booking) => sum + (booking.totalAmount || 0),
          0,
        ),
      });
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
  const handleEditHotel = (hotel) => {
    setEditingHotel(hotel);

    setFormData({
      hotelName: hotel.hotelName,
      city: hotel.city,
      address: hotel.address,
      description: hotel.description,
      starRating: hotel.starRating,
    });

    setOpen(true);
  };
  const handleDeleteHotel = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this hotel?",
    );

    if (!confirmDelete) return;

    try {
      await api.delete(`/hotels/${id}`);

      setHotels(hotels.filter((hotel) => hotel._id !== id));

      alert("Hotel deleted successfully");
    } catch (error) {
      console.log(error);

      alert("Failed to delete hotel");
    }
  };
  const handleSubmit = async () => {
    try {
      if (editingHotel) {
        await api.put(`/hotels/${editingHotel._id}`, formData);

        alert("Hotel Updated");
      } else {
        await api.post("/hotels", formData);

        alert("Hotel Created");
      }

      setOpen(false);

      setEditingHotel(null);

      fetchDashboard();
    } catch (error) {
      console.log(error);
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
                  <TableCell>{hotel.roomName}</TableCell>

                  <TableCell>{hotel.city}</TableCell>

                  <TableCell>{hotel.starRating}</TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      variant="contained"
                      sx={{ mr: 1 }}
                      onClick={() => handleEditHotel(hotel)}
                    >
                      Edit
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => handleDeleteHotel(hotel._id)}
                    >
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
                  <TableCell>{room.roomName}</TableCell>

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

                  <TableCell>{booking.hotelId?.hotelName}</TableCell>

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
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>{editingHotel ? "Edit Hotel" : "Add Hotel"}</DialogTitle>

        <DialogContent>
          <TextField
            fullWidth
            margin="normal"
            label="Hotel Name"
            value={formData.hotelName}
            onChange={(e) =>
              setFormData({
                ...formData,
                hotelName: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="City"
            value={formData.city}
            onChange={(e) =>
              setFormData({
                ...formData,
                city: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            label="Address"
            value={formData.address}
            onChange={(e) =>
              setFormData({
                ...formData,
                address: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            multiline
            rows={3}
            label="Description"
            value={formData.description}
            onChange={(e) =>
              setFormData({
                ...formData,
                description: e.target.value,
              })
            }
          />

          <TextField
            fullWidth
            margin="normal"
            type="number"
            label="Star Rating"
            value={formData.starRating}
            onChange={(e) =>
              setFormData({
                ...formData,
                starRating: e.target.value,
              })
            }
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSubmit}>
            {editingHotel ? "Update Hotel" : "Create Hotel"}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboard;
