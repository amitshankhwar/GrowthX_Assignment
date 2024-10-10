const express = require("express");
const {
  registerUser,
  loginUser,
  uploadAssignment,
  getAdmins,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// User registration
router.post("/register", registerUser);

// User login
router.post("/login", loginUser);

// Upload assignment
router.post("/upload", authMiddleware("user"), uploadAssignment);

// Get all admins
router.get("/admins", getAdmins);

module.exports = router;
