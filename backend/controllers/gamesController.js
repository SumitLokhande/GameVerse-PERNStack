import {
  allGames,
  gamesCategories,
  latestGamesList,
  GOTYList,
  gamesReviews,
} from "../dummyData.js";
import { generateGameRecommendation } from "../utils/gemini.js";

export const getAllGames = async (req, res, next) => {
  return res.json({
    success: true,
    data: [...allGames],
  });
};

export const getLatestGames = async (req, res, next) => {
  return res.json({
    success: true,
    data: [...latestGamesList],
  });
};

export const getGamesCategories = async (req, res, next) => {
  return res.json({
    success: true,
    data: [...gamesCategories],
  });
};

export const getGOTYGames = async (req, res, next) => {
  return res.json({
    success: true,
    data: [...GOTYList],
  });
};

export const getGamesReviews = async (req, res, next) => {
  return res.json({
    success: true,
    data: [...gamesReviews],
  });
};

export const generateRecommendation = async (req, res, next) => {
  try {
    const {
      platforms = [],
      genreType = "any",
      players = 4,
      difficulty = "medium",
    } = req.body;

    // Generate recommendation using gemini
    const recommendation = await generateGameRecommendation({
      platforms,
      genreType,
      players,
      difficulty,
    });

    res.status(200).json({
      success: true,
      message: "Recommendation generated successfully",
      data: { ...recommendation },
    });
  } catch (err) {
    next(err);
  }
};
