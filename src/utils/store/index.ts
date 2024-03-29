import { configureStore } from "@reduxjs/toolkit";
import { farmerDetailsReducer } from "./slice/farmerDetails";
import { mdDetailsReducer } from "./slice/mdDetails";
import { resolutionReducer } from "./slice/resolution";
import { portfoliosReducer } from "./slice/portfolio";

const store = configureStore({
  reducer: {
    farmerDetails: farmerDetailsReducer,
    resolution: resolutionReducer,
    mdDetails: mdDetailsReducer,
    portfolio: portfoliosReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Export store and the type below
 type RootState = ReturnType<typeof store.getState>;

