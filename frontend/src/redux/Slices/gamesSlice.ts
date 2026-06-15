import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import {
  type Category,
  type GameDetail,
  type GOTYGameDetail,
} from "../../types/authTypes";
import {
  getAllGames,
  getGamesCategories,
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

interface GamesItem {
  allGames: GameDetail[];
  latestGames: GameDetail[];
  allGOTYList: GOTYGameDetail[];
  gamesCategories: Category[];
}

const initialState: GamesItem = {
  allGames: [],
  latestGames: [],
  allGOTYList: [],
  gamesCategories: [],
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
      });
  },
});

export default gamesSlice.reducer;
