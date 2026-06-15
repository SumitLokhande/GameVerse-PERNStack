import express from "express";
import {
  getAllGames,
  getGamesCategories,
  getGOTYGames,
  getLatestGames,
} from "../controllers/gamesController.js";
const router = express.Router();
import authMiddleware from "../middleware/auth.js";

router.get("/", authMiddleware, getAllGames);
router.get("/categories", authMiddleware, getGamesCategories);
router.get("/latest", authMiddleware, getLatestGames);
router.get("/allGOTY", authMiddleware, getGOTYGames);

export default router;
