import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Box,
  Typography,
} from "@mui/material";

import { Dashboard, Hotel, MeetingRoom, BookOnline } from "@mui/icons-material";

import { Link, Outlet } from "react-router-dom";

const drawerWidth = 250;

function AdminLayout() {
  const menuItems = [
    {
      text: "Dashboard",
      icon: <Dashboard />,
      path: "/admin",
    },
    {
      text: "Hotels",
      icon: <Hotel />,
      path: "/admin/hotels",
    },
    {
      text: "Rooms",
      icon: <MeetingRoom />,
      path: "/admin/rooms",
    },
    {
      text: "Bookings",
      icon: <BookOnline />,
      path: "/admin/bookings",
    },
  ];

  return (
    <Box sx={{ display: "flex" }}>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,

          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            marginTop: "80px",
          },
        }}
      >
        <Toolbar>
          <Typography variant="h6" fontWeight="bold">
            Admin Panel
          </Typography>
        </Toolbar>

        <List>
          {menuItems.map((item) => (
            <ListItem key={item.text} disablePadding>
              <ListItemButton component={Link} to={item.path}>
                {item.icon}

                <ListItemText
                  sx={{
                    ml: 2,
                  }}
                  primary={item.text}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
        }}
      >
        <Outlet />
      </Box>
    </Box>
  );
}

export default AdminLayout;
