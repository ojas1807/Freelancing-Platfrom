import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173',  // Your React frontend URL
  credentials: true,  // Allow cookies and authentication headers
}));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use('/api/freelancer', freelancerRoutes);
app.use('/api/client', clientRoutes);

mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("❌ MongoDB Connection Error:", err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));

// server.js - Main entry point




// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');
// const passport = require('passport');
// const path = require('path');
// require('dotenv').config();

// // Initialize app
// const app = express();

// // Middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));

// // Passport middleware
// app.use(passport.initialize());
// require('./config/passport')(passport);

// // Routes
// app.use('/api/auth', require('./routes/api/auth'));
// app.use('/api/profile', require('./routes/api/portfolio'));

// // Error handling middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({ message: 'Server Error', error: process.env.NODE_ENV === 'development' ? err.message : {} });
// });

// // Set port and start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

// // config/db.js - Since you've already set up MongoDB connection
// const mongoose = require('mongoose');
// require('dotenv').config();

// const connectDB = async () => {
//   try {
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       useCreateIndex: true,
//       useFindAndModify: false
//     });
//     console.log('MongoDB connected...');
//   } catch (err) {
//     console.error('Database connection error:', err.message);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;
