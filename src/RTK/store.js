import { configureStore } from "@reduxjs/toolkit";
import postalCodeSlice from "./postalCodeSlice";

export const store = configureStore({
  reducer: { postalCodeSlice },
});
