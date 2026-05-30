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
                <TextField fullWidth label="Location" />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField fullWidth type="date" />
              </Grid>

              <Grid item xs={12} md={3}>
                <TextField fullWidth type="date" />
              </Grid>

              <Grid item xs={12} md={3}>
                <Button fullWidth variant="contained" size="large">
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
