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
  IconButton,
  CircularProgress,
  MenuItem,
  Chip,
  Grid,
} from "@mui/material";

import { Add, Edit, Delete } from "@mui/icons-material";

import api from "../../api/axios";

function RoomManagement() {
  const [loading, setLoading] = useState(true);

  const [rooms, setRooms] = useState([]);

  const [hotels, setHotels] = useState([]);

  const [open, setOpen] = useState(false);

  const [editingRoom, setEditingRoom] = useState(null);

  const [formData, setFormData] = useState({
    hotelId: "",
    roomName: "",
    roomNumber: "",
    roomType: "",
    capacity: "",
    price: "",
    isAvailable: true,
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const roomRes = await api.get("/rooms");

      const hotelRes = await api.get("/hotels");

      setRooms(roomRes.data.data);

      setHotels(hotelRes.data.data);
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

  const handleAddRoom = () => {
    setEditingRoom(null);

    setFormData({
      hotelId: "",
      roomNumber: "",
      roomType: "",
      capacity: "",
      price: "",
      isAvailable: true,
    });

    setOpen(true);
  };

  const handleEditRoom = (room) => {
    setEditingRoom(room);

    setFormData({
      hotelId: room.hotelId?._id,
      roomName: room.roomName,
      roomNumber: room.roomNumber,
      roomType: room.roomType,
      capacity: room.capacity,
      price: room.price,
      isAvailable: room.isAvailable,
    });

    setOpen(true);
  };

  const handleSubmit = async () => {
    try {
      console.log("Submitting:", formData);

      if (editingRoom) {
        console.log("UPDATE API");

        const res = await api.put(`/rooms/${editingRoom._id}`, formData);

        console.log(res.data);
      } else {
        console.log("CREATE API");

        const res = await api.post("/rooms", formData);

        console.log(res.data);
      }

      setOpen(false);

      fetchData();
    } catch (error) {
      console.log("API ERROR:", error.response?.data);

      console.log(error);
    }
  };

  const handleDeleteRoom = async (id) => {
    if (!window.confirm("Delete Room?")) return;

    try {
      await api.delete(`/rooms/${id}`);

      fetchData();
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
      <Typography variant="h4" fontWeight="bold" gutterBottom>
        Room Management
      </Typography>

      <Button
        startIcon={<Add />}
        variant="contained"
        sx={{ mb: 3 }}
        onClick={handleAddRoom}
      >
        Add Room
      </Button>

      <Paper elevation={4}>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Hotel</TableCell>

                <TableCell>Room No</TableCell>

                <TableCell>Type</TableCell>

                <TableCell>Capacity</TableCell>

                <TableCell>Price</TableCell>

                <TableCell>Status</TableCell>

                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {rooms.map((room) => (
                <TableRow key={room._id}>
                  <TableCell>{room.hotelId?.hotelName}</TableCell>

                  <TableCell>{room.roomNumber}</TableCell>

                  <TableCell>{room.roomType}</TableCell>

                  <TableCell>{room.capacity}</TableCell>

                  <TableCell>₹{room.price}</TableCell>

                  <TableCell>
                    <Chip
                      label={room.isAvailable ? "Available" : "Booked"}
                      color={room.isAvailable ? "success" : "error"}
                    />
                  </TableCell>

                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditRoom(room)}
                    >
                      <Edit />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteRoom(room._id)}
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

      {/* Dialog */}

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>{editingRoom ? "Edit Room" : "Add Room"}</DialogTitle>

        <DialogContent>
          <Grid container spacing={2} mt={1}>
            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Hotel"
                name="hotelId"
                value={formData.hotelId}
                onChange={handleChange}
              >
                {hotels.map((hotel) => (
                  <MenuItem key={hotel._id} value={hotel._id}>
                    {hotel.hotelName}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Room Name"
                name="roomName"
                value={formData.roomName}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Room Number"
                name="roomNumber"
                value={formData.roomNumber}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                label="Room Type"
                name="roomType"
                value={formData.roomType}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={6}>
              <TextField
                fullWidth
                type="number"
                label="Price"
                name="price"
                value={formData.price}
                onChange={handleChange}
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                select
                fullWidth
                label="Availability"
                name="isAvailable"
                value={formData.isAvailable}
                onChange={handleChange}
              >
                <MenuItem value={true}>Available</MenuItem>

                <MenuItem value={false}>Booked</MenuItem>
              </TextField>
            </Grid>
          </Grid>
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

export default RoomManagement;
