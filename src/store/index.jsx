import authReducer from "./slices/authSlice";
import bookReducer from "./slices/bookSlice";
import reportReducer from "./slices/reportSlice";

const { configureStore } = require("@reduxjs/toolkit");

const store = configureStore({
  reducer: { books: bookReducer, auth: authReducer, report: reportReducer },
});

export default store;
