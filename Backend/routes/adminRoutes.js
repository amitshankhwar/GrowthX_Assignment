const express = require("express");
const {
  loginAdmin,
  getAssignments,
  acceptAssignment,
  rejectAssignment,
} = require("../controllers/adminController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

// Admin login
router.post("/login", loginAdmin);

// View all assignments for the admin
router.get("/assignments", authMiddleware("admin"), getAssignments);

// Accept an assignment
router.post(
  "/assignments/:id/accept",
  authMiddleware("admin"),
  acceptAssignment
);

// Reject an assignment
router.post(
  "/assignments/:id/reject",
  authMiddleware("admin"),
  rejectAssignment
);

module.exports = router;
