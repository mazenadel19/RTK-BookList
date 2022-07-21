import { createSlice } from "@reduxjs/toolkit";

const initialState = { isLoggedIn: false, username: "" };

const authSlice = createSlice({
  name: "authSlice",
  initialState:{ isLoggedIn: true, username: "anon." },
  reducers: {
    login: (state, action) => {
      return { isLoggedIn: true, username: action.payload.username };
    },
    logout: () => {
      return initialState;
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
