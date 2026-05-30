import {
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Typography,
  Button,
  Rating,
  Box,
} from "@mui/material";

import LocationOnIcon from "@mui/icons-material/LocationOn";

import { Link } from "react-router-dom";

function HotelCard({ hotel }) {
  return (
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
          hotel.images?.[0] || "https://images.unsplash.com/photo-1566073771259"
        }
      />

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" fontWeight="bold">
          {hotel.hotelName}
        </Typography>

        <Box display="flex" alignItems="center" gap={1} mt={1}>
          <LocationOnIcon color="error" fontSize="small" />

          <Typography variant="body2">{hotel.city}</Typography>
        </Box>

        <Rating
          value={hotel.starRating || 0}
          precision={0.5}
          readOnly
          sx={{ mt: 1 }}
        />

        <Typography variant="body2" color="text.secondary" mt={1}>
          {hotel.description}
        </Typography>

        <Typography variant="h6" color="primary" mt={2}>
          ₹{hotel.price || "N/A"}
        </Typography>
      </CardContent>

      <CardActions>
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
  );
}

export default HotelCard;
