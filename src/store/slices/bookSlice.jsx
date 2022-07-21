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
      if (typeof data.length !== "number") {
        throw new Error("Network Error, Couldn't get your books");
      }
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const postBook = createAsyncThunk(
  "book/postBook",
  async (bookData, thunkAPI) => {
    const { rejectWithValue, getState } = thunkAPI;
    try {
      const { auth } = getState();
      bookData.username = auth.username;
      const response = await fetch(
        "https://redux-shoppin-cart-json-server.herokuapp.com/books",
        {
          method: "POST",
          body: JSON.stringify(bookData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      if (!Object.keys(data).length) {
        throw new Error("Network Error, Couldn't post your book");
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
    // getBooks
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

    // postBook
    [postBook.pending]: (state, action) => {
      state.isLoading = true;
      state.isError = false;
    },
    [postBook.fulfilled]: (state, action) => {
      console.log(action);

      state.books.unshift(action.payload);
      state.isLoading = false;
      state.isError = false;
    },
    [postBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default bookSlice.reducer;
