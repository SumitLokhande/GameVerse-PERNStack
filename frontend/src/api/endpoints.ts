import { apiGet, apiPost } from "../api/axios";

export const login = async (formData: object) => {
  const res = await apiPost("auth/login", formData);
  return res.data;
};

export const register = async (formData: object) => {
  const res = await apiPost("auth/sign-up", formData);
  return res.data;
};

export const getAllGames = async () => {
  const res = await apiGet("games");
  return res.data.data;
};

export const getLatestGames = async () => {
  const res = await apiGet("games/latest");
  return res.data.data;
};

export const getGOTYGames = async () => {
  const res = await apiGet("/games/allGOTY");
  return res.data.data;
};

export const getGamesCategories = async () => {
  const res = await apiGet("/games/categories");
  return res.data.data;
};
