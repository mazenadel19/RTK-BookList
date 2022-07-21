import React, { Fragment, useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { getBooks } from "../../store/slices/bookSlice";

import "./book.css";

const PostContainer = () => {
  const { books, isLoading } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const first = useRef(true);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    if (first.current) {
      dispatch(getBooks());
      first.current = false;
    }
    // return () => {
    //   setSelectedBook(null);
    // };
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList
            books={books}
            isLoading={isLoading}
            setSelectedBook={setSelectedBook}
          />
        </div>
        <div className="col side-line">
          <BookInfo book={selectedBook} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
