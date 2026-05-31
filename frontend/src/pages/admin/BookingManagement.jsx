import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Paper,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Chip,
  CircularProgress,
  TextField,
  MenuItem,
  Select,
  FormControl,
  Button,
  Box,
} from "@mui/material";

import api from "../../api/axios";

function BookingManagement() {
  const [loading, setLoading] = useState(true);

  const [bookings, setBookings] = useState([]);

  const [filteredBookings, setFilteredBookings] = useState([]);

  const [statusFilter, setStatusFilter] = useState("All");

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const response = await api.get("/bookings");

      console.log("Bookings API:", response.data);

      const bookingsData =
        response.data.data || response.data.bookings || response.data || [];

      setBookings(bookingsData);
      setFilteredBookings(bookingsData);
    } catch (error) {
      console.log(error);

      setBookings([]);
      setFilteredBookings([]);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (bookingId, status) => {
    try {
      await api.put(`/bookings/${bookingId}/status`, {
        status,
      });
      fetchBookings();
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    let filtered = bookings;

    if (statusFilter !== "All") {
      filtered = filtered.filter(
        (booking) => booking.bookingStatus === statusFilter,
      );
    }

    if (search) {
      filtered = filtered.filter(
        (booking) =>
          booking.userId?.name?.toLowerCase().includes(search.toLowerCase()) ||
          booking.hotelId?.hotelName
            ?.toLowerCase()
            .includes(search.toLowerCase()),
      );
    }

    setFilteredBookings(filtered);
  }, [search, statusFilter, bookings]);

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
      <Container sx={{ py: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Booking Management
      </Typography>

      {/* Filters */}

      <Paper
        sx={{
          p: 2,
          mb: 3,
        }}
      >
        <Box display="flex" gap={2} flexWrap="wrap">
          <TextField
            label="Search"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <FormControl
            sx={{
              minWidth: 200,
            }}
          >
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="All">All</MenuItem>

              <MenuItem value="Pending">Pending</MenuItem>

              <MenuItem value="Confirmed">Confirmed</MenuItem>

              <MenuItem value="Completed">Completed</MenuItem>

              <MenuItem value="Cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>
        </Box>
      </Paper>

      {/* Table */}

      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Customer</TableCell>

                <TableCell>Hotel</TableCell>

                <TableCell>Room</TableCell>

                <TableCell>Check In</TableCell>

                <TableCell>Check Out</TableCell>

                <TableCell>Amount</TableCell>

                <TableCell>Status</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredBookings.map((booking) => (
                <TableRow key={booking._id}>
                  <TableCell>{booking.userId?.name}</TableCell>

                  <TableCell>{booking.hotelId?.hotelName}</TableCell>

                  <TableCell>{booking.roomId?.roomType}</TableCell>

                  <TableCell>
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>
                    {new Date(booking.checkOutDate).toLocaleDateString()}
                  </TableCell>

                  <TableCell>₹{booking.totalAmount}</TableCell>

                  <TableCell>
                    <Chip
                      label={booking.bookingStatus}
                      color={statusColor(booking.bookingStatus)}
                    />
                  </TableCell>

                  <TableCell>
                    <Button
                      size="small"
                      color="success"
                      variant="contained"
                      sx={{
                        mr: 1,
                      }}
                      onClick={() => updateStatus(booking._id, "Confirmed")}
                    >
                      Confirm
                    </Button>

                    <Button
                      size="small"
                      color="primary"
                      variant="contained"
                      sx={{
                        mr: 1,
                      }}
                      onClick={() => updateStatus(booking._id, "Completed")}
                    >
                      Complete
                    </Button>

                    <Button
                      size="small"
                      color="error"
                      variant="contained"
                      onClick={() => updateStatus(booking._id, "Cancelled")}
                    >
                      Cancel
                    </Button>
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

export default BookingManagement;
