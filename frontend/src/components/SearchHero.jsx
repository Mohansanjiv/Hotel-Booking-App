import {
  Box,
  Container,
  Typography,
  Paper,
  Grid,
  TextField,
  Button,
} from "@mui/material";

function SearchHero({ searchData, setSearchData, onSearch }) {
  return (
    <Box
      sx={{
        height: 400,
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
            p: 3,
            borderRadius: 3,
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                label="City"
                value={searchData.city}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    city: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                value={searchData.checkIn}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    checkIn: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <TextField
                fullWidth
                type="date"
                value={searchData.checkOut}
                onChange={(e) =>
                  setSearchData({
                    ...searchData,
                    checkOut: e.target.value,
                  })
                }
              />
            </Grid>

            <Grid item xs={12} md={3}>
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  height: "56px",
                }}
                onClick={onSearch}
              >
                Search Hotels
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Container>
    </Box>
  );
}

export default SearchHero;
