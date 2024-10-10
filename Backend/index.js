const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");

// Import routers
const userRouter = require("./routes/userRoutes");
const adminRouter = require("./routes/adminRoutes");

// Load environment variables
dotenv.config();

// Initialize express app
const app = express();

// Middleware
app.use(cors()); // Allow cross-origin requests
app.use(bodyParser.json()); // Parse incoming JSON data

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected successfully");
  })
  .catch((err) => {
    console.error("MongoDB connection error:", err);
  });

// Routes
app.use("/api/users", userRouter); // User-related routes
app.use("/api/admins", adminRouter); // Admin-related routes

// Default route
app.get("/", (req, res) => {
  res.send("Assignment Submission Portal API");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
