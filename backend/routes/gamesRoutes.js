import express from "express";
import {
  generateRecommendation,
  getAllGames,
  getGamesCategories,
  getGamesReviews,
  getGOTYGames,
  getLatestGames,
} from "../controllers/gamesController.js";
const router = express.Router();
import authMiddleware from "../middleware/auth.js";

router.get("/", getAllGames);
router.get("/categories", getGamesCategories);
router.get("/latest", getLatestGames);
router.get("/allGOTY", getGOTYGames);
router.get("/gamesReviews", authMiddleware, getGamesReviews);
router.post("/gamesRecommendation", authMiddleware, generateRecommendation);

export default router;
