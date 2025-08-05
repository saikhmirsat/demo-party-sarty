const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

dotenv.config();
const app = express();

connectDB();
app.use(cors({
  origin: ["http://localhost:3000", "http://127.0.0.1:5173","https://demo-party-sarty.vercel.app"], // allowed origins
  methods: ["GET", "POST", "PUT", "DELETE"],
  credentials: true // if using cookies or auth headers
}));

app.use(express.json());

// Routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/students", require("./routes/studentRoutes"));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
