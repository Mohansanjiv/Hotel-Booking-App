import { useContext, useEffect, useState } from "react";
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Avatar,
  Box,
  Button,
  Chip,
  Paper,
  CircularProgress,
} from "@mui/material";

import { BookOnline, Hotel, CheckCircle, Pending } from "@mui/icons-material";

import { Link } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";
import api from "../api/axios";

function Dashboard() {
  const { user } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    totalBookings: 0,
    confirmedBookings: 0,
    pendingBookings: 0,
  });

  const [recentBookings, setRecentBookings] = useState([]);

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    try {
      const { data } = await api.get("/dashboard/user");

      setStats(data.stats);

      setRecentBookings(data.recentBookings || []);
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
      {/* Profile Section */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Box display="flex" alignItems="center" gap={3}>
          <Avatar
            sx={{
              width: 70,
              height: 70,
              fontSize: 30,
            }}
          >
            {user?.name?.charAt(0)}
          </Avatar>

          <Box>
            <Typography variant="h5" fontWeight="bold">
              Welcome, {user?.name}
            </Typography>

            <Typography color="text.secondary">{user?.email}</Typography>
          </Box>
        </Box>
      </Paper>

      {/* Stats Cards */}

      <Grid container spacing={3} mb={4}>
        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <BookOnline color="primary" fontSize="large" />

              <Typography variant="body1" mt={1}>
                Total Bookings
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {stats.totalBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <CheckCircle color="success" fontSize="large" />

              <Typography variant="body1" mt={1}>
                Confirmed
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {stats.confirmedBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card elevation={4}>
            <CardContent>
              <Pending color="warning" fontSize="large" />

              <Typography variant="body1" mt={1}>
                Pending
              </Typography>

              <Typography variant="h4" fontWeight="bold">
                {stats.pendingBookings}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Quick Actions */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          mb: 4,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Quick Actions
        </Typography>

        <Box display="flex" gap={2} flexWrap="wrap">
          <Button variant="contained" component={Link} to="/hotels">
            Browse Hotels
          </Button>

          <Button variant="outlined" component={Link} to="/my-bookings">
            My Bookings
          </Button>

          <Button variant="outlined" component={Link} to="/profile">
            Profile
          </Button>
        </Box>
      </Paper>

      {/* Recent Bookings */}

      <Paper
        elevation={3}
        sx={{
          p: 3,
          borderRadius: 3,
        }}
      >
        <Typography variant="h6" gutterBottom>
          Recent Bookings
        </Typography>

        {recentBookings.length === 0 ? (
          <Typography>No bookings found.</Typography>
        ) : (
          recentBookings.map((booking) => (
            <Box
              key={booking._id}
              sx={{
                p: 2,
                mb: 2,
                border: "1px solid #eee",
                borderRadius: 2,
              }}
            >
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                flexWrap="wrap"
              >
                <Box>
                  <Typography fontWeight="bold">
                    {booking.hotelId?.name}
                  </Typography>

                  <Typography variant="body2">
                    Check-In:{" "}
                    {new Date(booking.checkInDate).toLocaleDateString()}
                  </Typography>

                  <Typography variant="body2">
                    Amount: ₹{booking.totalAmount}
                  </Typography>
                </Box>

                <Chip
                  label={booking.bookingStatus}
                  color={statusColor(booking.bookingStatus)}
                />
              </Box>
            </Box>
          ))
        )}
      </Paper>
    </Container>
  );
}

export default Dashboard;
