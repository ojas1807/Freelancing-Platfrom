
import express, { json } from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import clientRoutes from "./routes/clientRoutes.js";
import freelancerRoutes from "./routes/freelancerRoutes.js";
import { fileURLToPath } from "url";
import projectRoutes from "./routes/projectRoutes.js";
import path from "path";
import chatRoutes from "./routes/chatRoutes.js"; // Chat routes
import messageRoutes from "./routes/messageRoutes.js"; // Message routes
import userRoutes from "./routes/userRoutes.js"; // User routes
import freelancerRouter from "./routes/freelancers.js"; // Freelancer routes
import paymentRoutes from "./routes/paymentRoutes.js"; // Payment routes


dotenv.config();
// Initialize app
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
app.use("/api/freelancer-profile", freelancerRoutes);
app.use("/api/project", projectRoutes); // Project management routes
app.use("/api/chats", chatRoutes); // Chat routes
app.use("/api/messages", messageRoutes); // Message routes
app.use('/api/users', userRoutes); // User routes
app.use('/api', freelancerRouter); // Freelancer routes
app.use('/api/payments', paymentRoutes);
// Static files - for uploads
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// Create uploads directory if it doesn't exist
import fs from "fs";
if (!fs.existsSync('./uploads')) {
  fs.mkdirSync('./uploads');
}

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
