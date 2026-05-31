import { Box, Typography } from "@mui/material";

function Footer() {
  return (
    <Box
      sx={{
        p: 2,
        textAlign: "center",
        bgcolor: "#1E293B",
        color: "#fff",
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        width: "100%",
        zIndex: 100000,
      }}
    >
      <Typography>© 2026 Hotel Booking</Typography>
    </Box>
  );
}

export default Footer;
