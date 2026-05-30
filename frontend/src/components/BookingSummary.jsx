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
      }}
    >
      <Typography variant="h5" gutterBottom>
        Booking Summary
      </Typography>

      <Divider sx={{ mb: 2 }} />

      <Box mb={2}>
        <Typography>Hotel:</Typography>

        <Typography fontWeight="bold">{hotel?.name}</Typography>
      </Box>

      <Box mb={2}>
        <Typography>Room:</Typography>

        <Typography fontWeight="bold">{room?.roomType}</Typography>
      </Box>

      <Box mb={2}>
        <Typography>Check In:</Typography>

        <Typography>{checkIn}</Typography>
      </Box>

      <Box mb={2}>
        <Typography>Check Out:</Typography>

        <Typography>{checkOut}</Typography>
      </Box>

      <Box mb={2}>
        <Typography>Guests:</Typography>

        <Typography>{guests}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Typography variant="h6" color="primary">
        Total: ₹{totalAmount}
      </Typography>

      <Button
        fullWidth
        variant="contained"
        size="large"
        sx={{ mt: 2 }}
        onClick={onProceed}
      >
        {buttonText}
      </Button>
    </Paper>
  );
}

export default BookingSummary;
