import {
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
} from "@mui/material";

function RoomCard({ room, selectedRoom, onSelect }) {
  return (
    <Card
      sx={{
        mb: 2,
        border: selectedRoom?._id === room._id ? "2px solid #1976d2" : "",
      }}
    >
      <CardContent>
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h6">{room.roomType}</Typography>

            <Typography>
              Room No:
              {room.roomNumber}
            </Typography>

            <Typography>
              Capacity:
              {room.capacity}
            </Typography>

            <Chip
              label={room.isAvailable ? "Available" : "Booked"}
              color={room.isAvailable ? "success" : "error"}
              sx={{ mt: 1 }}
            />
          </Grid>

          <Grid item xs={12} md={4}>
            <Typography variant="h6" color="primary">
              ₹{room.price}
            </Typography>

            <Button
              fullWidth
              variant="contained"
              sx={{ mt: 1 }}
              onClick={() => onSelect(room)}
              disabled={!room.isAvailable}
            >
              Select Room
            </Button>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

export default RoomCard;
