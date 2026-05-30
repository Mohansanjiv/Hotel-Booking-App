import { useState, useContext } from "react";

import {
  Box,
  Paper,
  TextField,
  Typography,
  Button,
  Alert,
  CircularProgress,
} from "@mui/material";

import { useNavigate } from "react-router-dom";

import api from "../api/axios";

import { AuthContext } from "../context/AuthContext";

function Register() {
  const navigate = useNavigate();

  const { loginUser } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setError("All fields are required");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const { data } = await api.post("/auth/register", formData);

      /*
      Expected Response

      {
        token: "...",
        user: {
          _id: "...",
          name: "...",
          email: "...",
          role: "User"
        }
      }
      */

      loginUser(data);

      if (data.user.role === "Admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      setError(error.response?.data?.message || "Registration Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f5f5f5"
    >
      <Paper
        elevation={6}
        sx={{
          p: 4,
          width: 420,
          borderRadius: 3,
        }}
      >
        <Typography variant="h4" gutterBottom align="center" fontWeight="bold">
          Register
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <TextField
            fullWidth
            label="Full Name"
            name="name"
            margin="normal"
            value={formData.name}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            margin="normal"
            value={formData.email}
            onChange={handleChange}
          />

          <TextField
            fullWidth
            label="Password"
            name="password"
            type="password"
            margin="normal"
            value={formData.password}
            onChange={handleChange}
          />

          <Button
            fullWidth
            variant="contained"
            size="large"
            sx={{ mt: 3 }}
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              "Create Account"
            )}
          </Button>
        </form>
      </Paper>
    </Box>
  );
}

export default Register;
