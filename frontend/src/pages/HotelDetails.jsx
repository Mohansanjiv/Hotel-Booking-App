import { useEffect, useState } from "react";

import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Chip,
  Button,
  Card,
  CardMedia,
  CardContent,
  Divider,
  CircularProgress,
} from "@mui/material";

import {
  LocationOn,
  Star,
  Wifi,
  Pool,
  Restaurant,
  LocalParking,
} from "@mui/icons-material";

import { useParams, useNavigate } from "react-router-dom";

import api from "../api/axios";

function HotelDetails() {
  const [rooms, setRooms] = useState([]);
  const { id } = useParams();

  const navigate = useNavigate();

  const [hotel, setHotel] = useState(null);

  const [selectedRoom, setSelectedRoom] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHotel();
  }, []);

  const fetchHotel = async () => {
    try {
      const response = await api.get(`/hotels/${id}`);

      console.log("Hotel Response:", response.data);

      if (response.data.success && response.data.data) {
        setHotel(response.data.data);
      } else {
        setHotel(null);
      }
    } catch (error) {
      console.log(error.response?.data);

      setHotel(null);
    } finally {
      setLoading(false);
    }
  };
  const handleSelectRoom = (room) => {
    setSelectedRoom(room);
  };

  const handleBookNow = () => {
    if (!selectedRoom) return;

    navigate(`/booking/${selectedRoom._id}`);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  if (!hotel) {
    return (
      <Container>
        <Typography>Hotel not found</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="xl" sx={{ py: 4 }}>
      {/* Image Gallery */}

      <Grid container spacing={2} mb={4}>
        <Grid item xs={12} md={8}>
          <Card>
            <CardMedia
              component="img"
              height="450"
              image={
                hotel?.images?.length > 0
                  ? hotel.images[0]
                  : "https://picsum.photos/1000/600"
              }
            />
          </Card>
        </Grid>

        <Grid item xs={12} md={4}>
          <Grid container spacing={2}>
            {hotel.images?.slice(1, 5).map((image, index) => (
              <Grid item xs={6} key={index}>
                <Card>
                  <CardMedia component="img" height="140" image={image} />
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      <Grid container spacing={4}>
        {/* Left Content */}

        <Grid item xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h4" fontWeight="bold">
              {hotel.hotelName}
            </Typography>

            <Box display="flex" alignItems="center" gap={1} mt={1}>
              <LocationOn color="error" />

              <Typography>{hotel.address}</Typography>
            </Box>

            <Box display="flex" alignItems="center" gap={1} mt={2}>
              <Star color="warning" />

              <Typography>
                {hotel.starRating}
                /5 Rating
              </Typography>
            </Box>

            <Typography mt={3}>{hotel.description}</Typography>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h6" gutterBottom>
              Amenities
            </Typography>

            <Box display="flex" gap={1} flexWrap="wrap">
              <Chip icon={<Wifi />} label="Free Wifi" />

              <Chip icon={<Pool />} label="Swimming Pool" />

              <Chip icon={<Restaurant />} label="Restaurant" />

              <Chip icon={<LocalParking />} label="Parking" />
            </Box>

            <Divider sx={{ my: 3 }} />

            <Typography variant="h5" gutterBottom>
              Available Rooms
            </Typography>

            {hotel?.rooms?.length > 0 ? (
              hotel.rooms.map((room) => (
                <Card
                  key={room._id}
                  sx={{
                    mb: 2,
                    border:
                      selectedRoom?._id === room._id ? "2px solid #1976d2" : "",
                  }}
                >
                  <CardContent>
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={12} md={8}>
                        <Typography variant="h6">
                          {room.roomName || room.roomType}
                        </Typography>

                        <Typography>Capacity: {room.capacity}</Typography>

                        <Typography>Room No: {room.roomNumber}</Typography>
                      </Grid>

                      <Grid item xs={12} md={4}>
                        <Typography variant="h6" color="primary">
                          ₹{room.price}/night
                        </Typography>

                        <Button
                          fullWidth
                          variant="contained"
                          sx={{ mt: 1 }}
                          onClick={() => navigate(`/booking/${room._id}`)}
                        >
                          Book Now
                        </Button>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              ))
            ) : (
              <Paper sx={{ p: 3 }}>
                <Typography>No rooms available for this hotel.</Typography>
              </Paper>
            )}
          </Paper>
        </Grid>

        {/* Booking Summary */}

        <Grid item xs={12} md={4}>
          <Paper
            elevation={4}
            sx={{
              p: 3,
              position: "sticky",
              top: 100,
            }}
          >
            <Typography variant="h5" gutterBottom>
              Booking Summary
            </Typography>

            {selectedRoom ? (
              <>
                <Typography>Hotel: {hotel.hotelName}</Typography>

                <Typography>Room: {selectedRoom.roomType}</Typography>

                <Typography>Price: ₹{selectedRoom.price}</Typography>

                <Divider
                  sx={{
                    my: 2,
                  }}
                />

                <Typography mb={2}>
                  Selected Room: {selectedRoom.roomType}
                </Typography>

                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  onClick={handleBookNow}
                >
                  Book Now
                </Button>
              </>
            ) : (
              <Typography color="text.secondary">
                Select a room to continue
              </Typography>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
}

export default HotelDetails;
