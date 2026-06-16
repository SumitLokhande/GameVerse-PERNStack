import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Category,
  type GameDetail,
  type GameRecommendation,
  type GOTYGameDetail,
  type Review,
} from "../../types/authTypes";
import {
  getAllGames,
  getGamesCategories,
  getGamesRecommendation,
  getGamesReviews,
  getGOTYGames,
  getLatestGames,
} from "../../api/endpoints";

export const getAllGamesList = createAsyncThunk(
  "games/getAllGamesList",
  async () => {
    const data = await getAllGames();
    return data;
  },
);

export const getLatestGamesList = createAsyncThunk(
  "games/getLatestGamesList",
  async () => {
    const data = await getLatestGames();
    return data;
  },
);

export const getGOTYGamesList = createAsyncThunk(
  "games/getGOTYGamesList",
  async () => {
    const data = await getGOTYGames();
    return data;
  },
);

export const getGamesCategoriesList = createAsyncThunk(
  "games/getGamesCategoriesList",
  async () => {
    const data = await getGamesCategories();
    return data;
  },
);

export const getGamesReviewsList = createAsyncThunk(
  "games/getGamesReviewsList",
  async () => {
    const data = await getGamesReviews();
    return data;
  },
);

export const getRecommendation = createAsyncThunk(
  "games/getRecommendation",
  async (payload: object) => {
    const data = await getGamesRecommendation(payload);
    return data;
  },
);

interface GamesItem {
  allGames: GameDetail[];
  latestGames: GameDetail[];
  allGOTYList: GOTYGameDetail[];
  gamesCategories: Category[];
  gamesReviews: Review[];
  gameRecommendation: GameRecommendation | null;
}

const initialState: GamesItem = {
  allGames: [],
  latestGames: [],
  allGOTYList: [],
  gamesCategories: [],
  gamesReviews: [],
  gameRecommendation: null,
};

const gamesSlice = createSlice({
  name: "games",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllGamesList.fulfilled, (state, action) => {
        state.allGames = action.payload;
      })
      .addCase(getLatestGamesList.fulfilled, (state, action) => {
        state.latestGames = action.payload;
      })
      .addCase(getGOTYGamesList.fulfilled, (state, action) => {
        state.allGOTYList = action.payload;
      })
      .addCase(getGamesCategoriesList.fulfilled, (state, action) => {
        state.gamesCategories = action.payload;
      })
      .addCase(getGamesReviewsList.fulfilled, (state, action) => {
        state.gamesReviews = action.payload;
      })
      .addCase(getRecommendation.fulfilled, (state, action) => {
        console.log(action.payload, "hit action.payload");
        state.gameRecommendation = action.payload;
      });
  },
});

export default gamesSlice.reducer;
