import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { logInsert } from "./reportSlice";

export const getBooks = createAsyncThunk(
  "book/getBooks",
  async (args, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        "https://everlasting-pond-sunday.glitch.me/books"
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
    const { rejectWithValue, getState, dispatch } = thunkAPI;
    const uuid = Math.random().toString(16).slice(2);
    try {
      const { auth } = getState();
      bookData.username = auth.username;
      const response = await fetch(
        "https://everlasting-pond-sunday.glitch.me/books",
        {
          method: "POST",
          body: JSON.stringify(bookData),
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();

      dispatch(logInsert({ id: uuid, name: "inserBook", status: "success" }));

      if (!Object.keys(data).length) {
        throw new Error("Network Error, Couldn't post your book");
      }
      return data;
    } catch (error) {
      dispatch(logInsert({ id: uuid, name: "inserBook", status: "failed" }));
      return rejectWithValue(error.message);
    }
  }
);

export const deleteBook = createAsyncThunk(
  "book/deleteBook",
  async (book, thunkAPI) => {
    const { rejectWithValue } = thunkAPI;
    try {
      const response = await fetch(
        `https://everlasting-pond-sunday.glitch.me/books/${book.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      );
      const data = await response.json();
      if (Object.keys(data).length > 0) {
        throw new Error("Network Error, Couldn't delete your book");
      }
      return book;
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
    [getBooks.pending]: (state) => {
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
    [postBook.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [postBook.fulfilled]: (state, action) => {
      state.books.unshift(action.payload);
      state.isLoading = false;
      state.isError = false;
    },
    [postBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },

    // deleteBook
    [deleteBook.pending]: (state) => {
      state.isLoading = true;
      state.isError = false;
    },
    [deleteBook.fulfilled]: (state, action) => {
      state.isLoading = false;
      state.isError = false;
      state.books = state.books.filter((b) => b.id !== action.payload.id);
    },
    [deleteBook.rejected]: (state, action) => {
      state.isLoading = false;
      state.isError = action.payload;
    },
  },
});

export default bookSlice.reducer;
