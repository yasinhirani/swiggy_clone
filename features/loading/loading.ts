import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
};

const loadingSlice = createSlice({
  name: "loading",
  initialState,
  reducers: {
    setLoading: (state, action) => {
      state.isLoading = action.payload;
    },
  },
});

export const { setLoading } = loadingSlice.actions;
export const loadingReducer = loadingSlice.reducer;
