import {
  allGames,
  gamesCategories,
  latestGamesList,
  GOTYList,
} from "../dummyData.js";

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
