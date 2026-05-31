import { useEffect, useState } from "react";

import {
  Container,
  Typography,
  Paper,
  Button,
  TextField,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableContainer,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  IconButton,
  CircularProgress,
} from "@mui/material";

import { Edit, Delete, Add } from "@mui/icons-material";

import api from "../../api/axios";

function HotelManagement() {
  const [loading, setLoading] = useState(true);

  const [hotels, setHotels] = useState([]);

  const [search, setSearch] = useState("");

  const [open, setOpen] = useState(false);

  const [editingHotel, setEditingHotel] = useState(null);

  const [formData, setFormData] = useState({
    hotelName: "",
    city: "",
    address: "",
    description: "",
    starRating: 5,
  });

  useEffect(() => {
    fetchHotels();
  }, []);

  const fetchHotels = async () => {
    try {
      const { data } = await api.get("/hotels");

      setHotels(data.data);
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

  const handleAddHotel = () => {
    setEditingHotel(null);

    setFormData({
      hotelName: "",
      city: "",
      address: "",
      description: "",
      starRating: 5,
    });

    setOpen(true);
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

  const handleSubmit = async () => {
    try {
      if (editingHotel) {
        await api.put(`/hotels/${editingHotel._id}`, formData);
      } else {
        await api.post("/hotels", formData);
      }

      fetchHotels();

      setOpen(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDeleteHotel = async (id) => {
    if (!window.confirm("Delete hotel?")) return;

    try {
      await api.delete(`/hotels/${id}`);

      fetchHotels();
    } catch (error) {
      console.log(error);
    }
  };

  const filteredHotels = hotels.filter(
    (hotel) =>
      hotel.hotelName.toLowerCase().includes(search.toLowerCase()) ||
      hotel.city.toLowerCase().includes(search.toLowerCase()),
  );

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
        Hotel Management
      </Typography>

      <Paper
        sx={{
          p: 2,
          mb: 3,
        }}
      >
        <Grid container spacing={2}>
          <Grid item xs={12} md={8}>
            <TextField
              fullWidth
              label="Search Hotel"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Button
              fullWidth
              startIcon={<Add />}
              variant="contained"
              size="large"
              onClick={handleAddHotel}
            >
              Add Hotel
            </Button>
          </Grid>
        </Grid>
      </Paper>

      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hotel Name</TableCell>

                <TableCell>City</TableCell>

                <TableCell>Rating</TableCell>

                <TableCell>Address</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {filteredHotels.map((hotel) => (
                <TableRow key={hotel._id}>
                  <TableCell>{hotel.hotelName}</TableCell>

                  <TableCell>{hotel.city}</TableCell>

                  <TableCell>{hotel.starRating}</TableCell>

                  <TableCell>{hotel.address}</TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditHotel(hotel)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteHotel(hotel._id)}
                    >
                      <Delete />
                    </IconButton>
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
            label="Hotel Name"
            name="hotelName"
            margin="normal"
            value={formData.hotelName}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="City"
            name="city"
            margin="normal"
            value={formData.city}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Address"
            name="address"
            margin="normal"
            value={formData.address}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            multiline
            rows={4}
            label="Description"
            name="description"
            margin="normal"
            value={formData.description}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            type="number"
            label="Star Rating"
            name="starRating"
            margin="normal"
            value={formData.starRating}
            onChange={handleChange}
          />
        </DialogContent>

        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>

          <Button variant="contained" onClick={handleSubmit}>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default HotelManagement;
