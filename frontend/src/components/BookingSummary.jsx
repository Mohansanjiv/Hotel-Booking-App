import { Paper, Typography, Divider, Button, Box } from "@mui/material";

function BookingSummary({
  hotel,
  room,
  checkIn,
  checkOut,
  guests,
  totalAmount,
  onProceed,
  buttonText = "Proceed",
}) {
  return (
    <Paper
      elevation={4}
      sx={{
        p: 3,
        position: "sticky",
        top: 100,
        borderRadius: 3,
      }}
    >
      <Typography variant="h5" fontWeight="bold" gutterBottom>
        Booking Summary
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box mb={2}>
        <Typography color="text.secondary">Hotel</Typography>

        <Typography fontWeight="bold">{hotel?.hotelName}</Typography>
      </Box>

      <Box mb={2}>
        <Typography color="text.secondary">Room</Typography>

        <Typography fontWeight="bold">{room?.roomType}</Typography>
      </Box>

      <Box mb={2}>
        <Typography color="text.secondary">Check In</Typography>

        <Typography>{checkIn || "-"}</Typography>
      </Box>

      <Box mb={2}>
        <Typography color="text.secondary">Check Out</Typography>

        <Typography>{checkOut || "-"}</Typography>
      </Box>

      <Box mb={2}>
        <Typography color="text.secondary">Guests</Typography>

        <Typography>{guests || 1}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" color="primary" fontWeight="bold">
        Total: ₹{totalAmount || 0}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 3 }}
        onClick={onProceed}
        disabled={!room}
      >
        {buttonText}
      </Button>
    </Paper>
  );
}

export default BookingSummary;
