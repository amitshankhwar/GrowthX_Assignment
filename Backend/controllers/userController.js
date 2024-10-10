const User = require("../models/User");
const Assignment = require("../models/Assignment");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// User registration
exports.registerUser = async (req, res) => {
  const { username, password, role } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, password: hashedPassword, role });
  try {
    await user.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (err) {
    res.status(400).json({ message: "Error registering user" });
  }
};

// User login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  res.json({ token });
};

// Upload assignment
exports.uploadAssignment = async (req, res) => {
  const { task, admin } = req.body;
  const adminUser = await User.findOne({ username: admin, role: "admin" });

  if (!adminUser) return res.status(404).json({ message: "Admin not found" });

  const assignment = new Assignment({
    userId: req.user.id,
    adminId: adminUser._id,
    task,
  });

  try {
    await assignment.save();
    res.status(201).json({ message: "Assignment uploaded" });
  } catch (err) {
    res.status(400).json({ message: "Error uploading assignment" });
  }
};

// Get all admins
exports.getAdmins = async (req, res) => {
  const admins = await User.find({ role: "admin" });
  res.json(admins);
};
