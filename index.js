import express from "express";
import { connectDB } from "./src/config/db.js";
import cors from "cors";

// Import routes
import authRoutes from "./src/routes/authRoutes.js";
import loanRoutes from "./src/routes/loanRoutes.js";
import repaymentRoutes from "./src/routes/repaymentRoutes.js";

const PORT = 5000;
const app = express();

// CORS (Cross-Origin Resource Sharing) configuration
const corsOptions = {
  origin: [
    "http://localhost:5173", // Local development URL on port 5173
    "https://mini-loan-app-react.netlify.app", // Production URL
  ],
  methods: ["GET", "POST", "PATCH", "DELETE"], // Allowed methods
  credentials: true, // Allow credentials (if needed)
};

// Use CORS middleware with options
app.use(cors(corsOptions));

// Middleware
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/loans", loanRoutes);
app.use("/api/repayments", repaymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log("Server running on port " + PORT);
  connectDB();
});
