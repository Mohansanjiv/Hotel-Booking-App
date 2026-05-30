import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import PrivateRoute from "./routes/PrivateRoute";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Hotels from "./pages/Hotels";
import HotelDetails from "./pages/HotelDetails";

import Dashboard from "./pages/Dashboard";
import MyBookings from "./pages/MyBookings";

// import Booking from "./pages/Booking";
// import Payment from "./pages/Payment";
// import BookingSuccess from "./pages/BookingSuccess";

import AdminDashboard from "./pages/AdminDashboard";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        {/* Public Routes */}

        <Route path="/" element={<Home />} />

        <Route path="/login" element={<Login />} />

        <Route path="/register" element={<Register />} />

        <Route path="/hotels" element={<Hotels />} />

        <Route path="/hotel/:id" element={<HotelDetails />} />

        {/* User Routes */}

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <PrivateRoute>
              <MyBookings />
            </PrivateRoute>
          }
        />

        {/* <Route
          path="/booking/:roomId"
          element={
            <PrivateRoute>
              <Booking />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/payment/:bookingId"
          element={
            <PrivateRoute>
              <Payment />
            </PrivateRoute>
          }
        /> */}

        {/* <Route
          path="/booking-success"
          element={
            <PrivateRoute>
              <BookingSuccess />
            </PrivateRoute>
          }
        /> */}

        {/* Admin */}

        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminDashboard />
            </PrivateRoute>
          }
        />

        {/* Not Found */}

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
