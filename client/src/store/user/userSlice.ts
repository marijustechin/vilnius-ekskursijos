import { createSlice } from "@reduxjs/toolkit";

const initialState = {};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    login: (state, action) => {},
    logout: (state, action) => {},
  },
});

export default userSlice.reducer;
