import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: { books: bookReducer, auth: authReducer },
});

export default store;
