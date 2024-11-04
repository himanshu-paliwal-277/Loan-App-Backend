import User from "../models/User.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Create new user
    const newUser = new User({ name, email, password });
    await newUser.save();

    res.status(201).json({ message: "User Registered Successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });

    // Verify password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.status(200).json({
      success: true,
      message: "Login successful!",
      token,
      userEmail: email,
      role: user.role,
      name: user.name,
      userId: user._id,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const registerAdmin = async (req, res) => {
  const { name, email, password, secretKey } = req.body;

  const SECRET_KEY = process.env.ADMIN_SECRET_KEY;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists." });
    }

    // Check if the secret key is correct
    if (secretKey !== SECRET_KEY) {
      return res.status(403).json({ message: "Invalid secret key." });
    }

    // Create the admin user
    const user = new User({
      name,
      email,
      password,
      role: "admin",
      createdWithSecret: true,
    });

    await user.save();
    res.status(201).json({ message: "Admin registered successfully." });
  } catch (error) {
    res.status(500).json({ message: "Server error." });
  }
};
