import { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Grid,
  TextField,
} from "@mui/material";

function Home() {
  const navigate = useNavigate();

  const [searchData, setSearchData] = useState({
    city: "",
    checkIn: "",
    checkOut: "",
  });

  const handleChange = (e) => {
    setSearchData({
      ...searchData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSearch = () => {
    navigate(
      `/hotels?city=${searchData.city}&checkIn=${searchData.checkIn}&checkOut=${searchData.checkOut}`,
    );
  };

  return (
    <Box>
      <Box
        sx={{
          height: "70vh",
          backgroundImage:
            "url('https://images.unsplash.com/photo-1566073771259-6a8506099945')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Container>
          <Paper
            elevation={8}
            sx={{
              p: 4,
              maxWidth: 900,
            }}
          >
            <Typography variant="h3" gutterBottom>
              Find Your Perfect Stay
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  label="Location"
                  name="city"
                  value={searchData.city}
                  onChange={handleChange}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  name="checkIn"
                  value={searchData.checkIn}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField
                  fullWidth
                  type="date"
                  name="checkOut"
                  value={searchData.checkOut}
                  onChange={handleChange}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Grid>

              <Grid item xs={12} md={3}>
                <Button
                  fullWidth
                  variant="contained"
                  size="large"
                  sx={{ height: "56px" }}
                  onClick={handleSearch}
                >
                  Search
                </Button>
              </Grid>
            </Grid>
          </Paper>
        </Container>
      </Box>
    </Box>
  );
}

export default Home;
