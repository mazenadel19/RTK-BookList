import { createSlice } from "@reduxjs/toolkit";

const initialState = { email: "", password: "" };

const authSlice = createSlice({
  name: "authSlice",
  initialState,
  reducers: {},
});

export default authSlice.reducer;
