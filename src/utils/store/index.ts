import { configureStore } from "@reduxjs/toolkit";
import { resolutionReducer } from "./slice/resolution";
import farmerDetails from './slice/farmerDetails'

const store = configureStore({
  reducer: {
    farmerDetails: farmerDetails,
    resolution: resolutionReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

export type RootState = ReturnType<typeof store.getState>;

export default store;
