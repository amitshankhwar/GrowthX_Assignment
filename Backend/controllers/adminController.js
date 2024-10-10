const Assignment = require("../models/Assignment");
const User = require("../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Admin login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;
  const admin = await User.findOne({ username, role: "admin" });

  if (!admin || !(await bcrypt.compare(password, admin.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: admin._id, role: "admin" },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
};

// Get assignments tagged to the admin
exports.getAssignments = async (req, res) => {
  const assignments = await Assignment.find({ adminId: req.user.id }).populate(
    "userId",
    "username"
  );
  res.json(assignments);
};

// Accept an assignment
exports.acceptAssignment = async (req, res) => {
  try {
    console.log(req.params.id);

    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, adminId: req.user.id },
      { status: "accepted" },
      { new: true }
    );
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    res.json({ message: "Assignment accepted" });
  } catch (err) {
    res.status(400).json({ message: "Error updating assignment" });
  }
};

// Reject an assignment
exports.rejectAssignment = async (req, res) => {
  try {
    const assignment = await Assignment.findOneAndUpdate(
      { _id: req.params.id, adminId: req.user.id },
      { status: "rejected" },
      { new: true }
    );
    if (!assignment)
      return res.status(404).json({ message: "Assignment not found" });

    res.json({ message: "Assignment rejected" });
  } catch (err) {
    res.status(400).json({ message: "Error updating assignment" });
  }
};
