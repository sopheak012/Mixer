import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  token: "",
  shouldLogout: false,
};

const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
      state.shouldLogout = true;
    },
    logoutUser: (state) => {
      state.token = "";
      state.shouldLogout = false;
    },
  },
});

export const { setToken, logoutUser } = globalSlice.actions;

export default globalSlice.reducer;
