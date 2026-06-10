import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

//Import routes
import authRoutes from "./routes/authRoute.js";

const app = express();

const allowedOrigins = [
  "https://game-verse-pern-stack.vercel.app/api",
  "http://localhost:5173",
];
console.log("Allowed Origins:", allowedOrigins);
// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true })); //
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// API routes
app.use("/api/auth", authRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`Environment: ${process.env.NODE_ENV}`);
});
