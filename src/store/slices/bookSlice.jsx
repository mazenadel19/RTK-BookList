import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        "https://redux-shoppin-cart-json-server.herokuapp.com/books"
      );
      const data = await response.json();
      if (!data.length) {
        throw new Error("Network Error, Couldn't fetch your books");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = { books: null, isLoading: false, isError: null };

const bookSlice = createSlice({
  name: "book",
  initialState,
  extraReducers: {
    [getBooks.pending]: (state, action) => {
      // console.log(current(state));
      state.books = [];
      state.isLoading = true;
      state.isError = false;
    },
    [getBooks.fulfilled]: (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
      state.isError = false;
    },
    [getBooks.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default bookSlice.reducer;
