import { configureStore } from "@reduxjs/toolkit";
import {farmerDetailsReducer} from "./slice/farmerDetails";
import { mdDetailsReducer } from "./slice/mdDetails";
import {resolutionReducer} from "./slice/resolution";

const store = configureStore({
  reducer: {
    farmerDetails: farmerDetailsReducer,
    resolution: resolutionReducer,
    mdDetails:mdDetailsReducer
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
