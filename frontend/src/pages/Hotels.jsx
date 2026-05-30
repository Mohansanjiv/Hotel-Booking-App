import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Grid,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Button,
  TextField,
  Box,
  Rating,
  CircularProgress,
  Paper,
  InputAdornment,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link } from "react-router-dom";

import api from "../api/axios";

function Hotels() {
  const [hotels, setHotels] = useState([]);

  const [filteredHotels, setFilteredHotels] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data } = await api.get("/hotels");

      console.log("API DATA", data);

      setHotels(data.data);
      setFilteredHotels(data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (value) => {
    setSearch(value);

    const filtered = hotels.filter(
      (hotel) =>
        hotel.hotelName?.toLowerCase().includes(value.toLowerCase()) ||
        hotel.city?.toLowerCase().includes(value.toLowerCase()),
    );

    setFilteredHotels(filtered);
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }
  console.log("hotels", filteredHotels);
  return (
    <>
      {/* Hero Section */}

      <Box
        sx={{
          height: 300,
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container maxWidth="lg">
          <Typography variant="h3" color="white" fontWeight="bold" mb={3}>
            Find Your Perfect Stay
          </Typography>

          <Paper
            elevation={8}
            sx={{
              p: 2,
              borderRadius: 3,
            }}
          >
            <TextField
              fullWidth
              placeholder="Search by hotel name or city..."
              value={search}
              onChange={(e) => handleSearch(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <SearchIcon />
                  </InputAdornment>
                ),
              }}
            />
          </Paper>
        </Container>
      </Box>

      {/* Hotels List */}

      <Container maxWidth="xl" sx={{ py: 5 }}>
        <Typography variant="h4" fontWeight="bold" mb={4}>
          Available Hotels
        </Typography>

        <Grid container spacing={4}>
          {filteredHotels.map((hotel) => (
            <Grid item xs={12} sm={6} md={4} key={hotel._id}>
              <Card
                elevation={4}
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-5px)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="240"
                  image={
                    hotel.images?.[0] ||
                    "https://images.unsplash.com/photo-1566073771259-6a8506099945"
                  }
                  alt={hotel.name}
                />

                <CardContent
                  sx={{
                    flexGrow: 1,
                  }}
                >
                  <Typography variant="h6" fontWeight="bold">
                    {hotel.name}
                  </Typography>

                  <Box display="flex" alignItems="center" gap={1} mt={1}>
                    <LocationOnIcon color="error" fontSize="small" />

                    <Typography variant="body2">{hotel.city}</Typography>
                  </Box>

                  <Box mt={1}>
                    <Rating
                      value={hotel.rating || 4}
                      precision={0.5}
                      readOnly
                    />
                  </Box>

                  <Typography variant="body2" color="text.secondary" mt={1}>
                    {hotel.description?.substring(0, 100)}
                    ...
                  </Typography>

                  <Typography variant="h6" color="primary" mt={2}>
                    ₹{hotel.minPrice || hotel.price || 2500}/ night
                  </Typography>
                </CardContent>

                <CardActions
                  sx={{
                    p: 2,
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    component={Link}
                    to={`/hotel/${hotel._id}`}
                  >
                    View Rooms
                  </Button>
                </CardActions>
              </Card>
            </Grid>
          ))}
        </Grid>

        {filteredHotels.length === 0 && (
          <Box textAlign="center" mt={5}>
            <Typography variant="h6">No hotels found</Typography>
          </Box>
        )}
      </Container>
    </>
  );
}

export default Hotels;
