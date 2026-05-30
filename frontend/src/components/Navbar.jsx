import { useContext, useState } from "react";

import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Avatar,
  Menu,
  MenuItem,
} from "@mui/material";

import MenuIcon from "@mui/icons-material/Menu";

import { Link, useNavigate } from "react-router-dom";

import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const navigate = useNavigate();

  const { user, logoutUser } = useContext(AuthContext);

  const [mobileOpen, setMobileOpen] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logoutUser();

    handleMenuClose();

    navigate("/login");
  };

  const navItems = [
    {
      label: "Home",
      path: "/",
    },
    {
      label: "Hotels",
      path: "/hotels",
    },
  ];

  return (
    <>
      <AppBar position="sticky" elevation={2}>
        <Toolbar>
          {/* Logo */}

          <Typography
            variant="h6"
            component={Link}
            to="/"
            sx={{
              textDecoration: "none",
              color: "#fff",
              fontWeight: "bold",
              flexGrow: 1,
            }}
          >
            Hotel Booking
          </Typography>

          {/* Desktop Menu */}

          <Box
            sx={{
              display: {
                xs: "none",
                md: "flex",
              },
              gap: 2,
              alignItems: "center",
            }}
          >
            {navItems.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                component={Link}
                to={item.path}
              >
                {item.label}
              </Button>
            ))}

            {!user ? (
              <>
                <Button color="inherit" component={Link} to="/login">
                  Login
                </Button>

                <Button
                  variant="contained"
                  color="secondary"
                  component={Link}
                  to="/register"
                >
                  Register
                </Button>
              </>
            ) : (
              <>
                <Button color="inherit" component={Link} to="/dashboard">
                  Dashboard
                </Button>

                <Button color="inherit" component={Link} to="/my-bookings">
                  My Bookings
                </Button>

                {user.role === "Admin" && (
                  <Button color="inherit" component={Link} to="/admin">
                    Admin
                  </Button>
                )}

                <IconButton color="inherit" onClick={handleMenuOpen}>
                  <Avatar>{user.name?.charAt(0)}</Avatar>
                </IconButton>

                <Menu
                  anchorEl={anchorEl}
                  open={Boolean(anchorEl)}
                  onClose={handleMenuClose}
                >
                  <MenuItem
                    component={Link}
                    to="/dashboard"
                    onClick={handleMenuClose}
                  >
                    Profile
                  </MenuItem>

                  <MenuItem onClick={handleLogout}>Logout</MenuItem>
                </Menu>
              </>
            )}
          </Box>

          {/* Mobile Menu Button */}

          <IconButton
            color="inherit"
            edge="end"
            onClick={handleDrawerToggle}
            sx={{
              display: {
                xs: "block",
                md: "none",
              },
            }}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}

      <Drawer anchor="right" open={mobileOpen} onClose={handleDrawerToggle}>
        <Box
          sx={{
            width: 250,
          }}
        >
          <List>
            {navItems.map((item) => (
              <ListItem key={item.label} disablePadding>
                <ListItemButton
                  component={Link}
                  to={item.path}
                  onClick={handleDrawerToggle}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              </ListItem>
            ))}

            {!user ? (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/login">
                    <ListItemText primary="Login" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/register">
                    <ListItemText primary="Register" />
                  </ListItemButton>
                </ListItem>
              </>
            ) : (
              <>
                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/dashboard">
                    <ListItemText primary="Dashboard" />
                  </ListItemButton>
                </ListItem>

                <ListItem disablePadding>
                  <ListItemButton component={Link} to="/my-bookings">
                    <ListItemText primary="My Bookings" />
                  </ListItemButton>
                </ListItem>

                {user.role === "Admin" && (
                  <ListItem disablePadding>
                    <ListItemButton component={Link} to="/admin">
                      <ListItemText primary="Admin Dashboard" />
                    </ListItemButton>
                  </ListItem>
                )}

                <ListItem disablePadding>
                  <ListItemButton onClick={handleLogout}>
                    <ListItemText primary="Logout" />
                  </ListItemButton>
                </ListItem>
              </>
            )}
          </List>
        </Box>
      </Drawer>
    </>
  );
}

export default Navbar;
