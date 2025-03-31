
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";

dotenv.config();
// Initialize app
const app = express();

// Middleware
app.use(json());
app.use(cors({ credentials: true, origin: "http://localhost:5173" })); // Adjust for frontend URL
app.use(cookieParser());

// Connect to Database
connectDB();

// Test Route
app.get("/", (req, res) => {
  res.send("API is running...");
});
app.use("/api/auth", authRoutes);
app.use("/api/client-profile", clientRoutes); 

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
