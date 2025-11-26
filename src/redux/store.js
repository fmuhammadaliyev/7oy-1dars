import { configureStore } from "@reduxjs/toolkit";
import carsDataReducer from "./cars-data-slice";

export const store = configureStore({
  reducer: {
    carsdata: carsDataReducer,
  },
});
