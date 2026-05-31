# Hotel Booking Application

A full-stack Hotel Booking Management System built using the MERN Stack (MongoDB, Express.js, React.js, Node.js). The application provides hotel search, room booking, payment simulation, booking management, and admin dashboard functionalities.

---

# Features

## User Features

- User Registration & Login
- JWT Authentication
- Search Hotels
- View Hotel Details
- View Available Rooms
- Book Rooms
- Mock Payment Gateway
- Booking Confirmation
- My Bookings Management
- Cancel Booking
- User Dashboard

---

## Admin Features

- Admin Authentication
- Dashboard Analytics
- Hotel Management (CRUD)
- Room Management (CRUD)
- Booking Management
- Update Booking Status
- Revenue Statistics
- Total Hotels Statistics
- Total Rooms Statistics
- Total Bookings Statistics

---

# Tech Stack

## Frontend

- React.js
- React Router DOM
- Material UI (MUI)
- Axios
- Context API

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- bcryptjs

---

# Project Structure

## Backend

backend/
│
├── controllers/
│ ├── authController.js
│ ├── hotelController.js
│ ├── roomController.js
│ ├── bookingController.js
│ ├── paymentController.js
│ └── dashboardController.js
│
├── services/
│ ├── authService.js
│ ├── hotelService.js
│ ├── roomService.js
│ ├── bookingService.js
│ ├── paymentService.js
│ └── dashboardService.js
│
├── models/
│ ├── User.js
│ ├── Hotel.js
│ ├── Room.js
│ ├── Booking.js
│ └── Payment.js
│
├── routes/
│ ├── authRoutes.js
│ ├── hotelRoutes.js
│ ├── roomRoutes.js
│ ├── bookingRoutes.js
│ ├── paymentRoutes.js
│ └── dashboardRoutes.js
│
├── middleware/
│ ├── authMiddleware.js
│ ├── adminMiddleware.js
│ └── errorMiddleware.js
│
├── config/
│ └── db.js
│
├── server.js
└── .env

---

## Frontend

frontend/
│
├── src/
│
├── components/
│ ├── Navbar.jsx
│ ├── Footer.jsx
│ ├── HotelCard.jsx
│ ├── RoomCard.jsx
│ └── BookingSummary.jsx
│
├── pages/
│ ├── Home.jsx
│ ├── Hotels.jsx
│ ├── HotelDetails.jsx
│ ├── Booking.jsx
│ ├── Payment.jsx
│ ├── BookingSuccess.jsx
│ ├── Dashboard.jsx
│ ├── MyBookings.jsx
│ ├── Login.jsx
│ └── Register.jsx
│
├── pages/admin/
│ ├── HotelManagement.jsx
│ ├── RoomManagement.jsx
│ └── BookingManagement.jsx
│
├── layouts/
│ └── AdminLayout.jsx
│
├── routes/
│ └── PrivateRoute.jsx
│
├── context/
│ └── AuthContext.jsx
│
├── api/
│ └── axios.js
│
├── App.jsx
└── main.jsx

---

# Installation

## Clone Repository

git clone https://github.com/yourusername/hotel-booking-app.git

cd hotel-booking-app

---

# Backend Setup

cd backend

npm install

Create .env file:

PORT=5000

MONGO_URI=your_mongodb_connection

JWT_SECRET=your_secret_key

Start Backend:

npm run dev

---

# Frontend Setup

cd frontend

npm install

Start Frontend:

npm run dev

---

# API Endpoints

## Authentication

POST /api/auth/register

POST /api/auth/login

GET /api/auth/profile

---

## Hotels

GET /api/hotels

GET /api/hotels/:id

POST /api/hotels

PUT /api/hotels/:id

DELETE /api/hotels/:id

---

## Rooms

GET /api/rooms

GET /api/rooms/:id

POST /api/rooms

PUT /api/rooms/:id

DELETE /api/rooms/:id

---

## Bookings

POST /api/bookings

GET /api/bookings/my

GET /api/bookings/:id

PUT /api/bookings/:id/status

DELETE /api/bookings/:id

GET /api/bookings/admin/all

---

## Payments

POST /api/payments

PUT /api/payments/verify

GET /api/payments/:id

---

## Dashboard

GET /api/dashboard/stats

GET /api/dashboard/bookings

GET /api/dashboard/revenue

---

# Authentication

JWT Token is required for protected routes.

Authorization:

Bearer <token>

---

# Booking Flow

User Login
↓
Search Hotels
↓
View Hotel Details
↓
Select Room
↓
Create Booking
↓
Payment
↓
Booking Success
↓
My Bookings

---

# Admin Flow

Admin Login
↓
Dashboard
↓
Manage Hotels
↓
Manage Rooms
↓
Manage Bookings
↓
View Revenue Statistics

---

# Future Improvements

- Razorpay Integration
- Stripe Integration
- Email Notifications
- Booking Invoice PDF
- Cloudinary Image Upload
- Hotel Reviews & Ratings
- Room Availability Calendar
- Booking Reports
- Occupancy Analytics
- Real-Time Notifications

---

credentitialas :-

for admin
"email": "admin@gmail.com",
"password": "123456"

for user
"email": "sanjiv@gmail.com",
"password": "123456",

# Author

Developed using MERN Stack.

Hotel Booking Management System © 2026
