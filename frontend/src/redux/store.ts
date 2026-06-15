import { combineReducers, configureStore } from "@reduxjs/toolkit";
// ...
import { persistStore, persistReducer } from "redux-persist";
import userReducer from "./Slices/userSlice";
import cartReducer from "./Slices/cartSlice";
import gamesReducer from "./Slices/gamesSlice";
import storageImport from "redux-persist/lib/storage";

const storage = (storageImport as any).default || storageImport;

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  games: gamesReducer,
});

const persistConfig = {
  key: "root",
  storage,
};

console.log(persistConfig, "persistConfig");

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

export const persistor = persistStore(store);
