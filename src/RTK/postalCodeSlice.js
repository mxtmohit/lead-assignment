import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  postalData: null,
  status:0
};

export const postalCodeSlice = createSlice({
  name: "postal",
  initialState,
  reducers: {
    updateData: (state, { payload }) => {
      state.postalData = payload;
    },
    Loader: (state, { payload }) => {
      state.status = payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { updateData,Loader} = postalCodeSlice.actions;

export default postalCodeSlice.reducer;
