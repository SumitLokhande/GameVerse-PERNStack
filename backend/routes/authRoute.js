import express from "express";
const router = express.Router();
import {
  register,
  login,
  getCurrentUser,
  requestPasswordReset,
} from "../controllers/authController.js";
import authMiddleware from "../middleware/auth.js";

// Public routes
// Register route
router.post("/sign-up", register);

// Login route
router.post("/login", login);

// Reset password route
router.post("/reset-password", requestPasswordReset);

// Private routes
router.get("/me", authMiddleware, getCurrentUser);

export default router;
