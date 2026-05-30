import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        p: 3,
        textAlign: "center",
        bgcolor: "#1E293B",
        color: "#fff",
      }}
    >
      <Typography>© 2026 Hotel Booking</Typography>
    </Box>
  );
}

export default Footer;
