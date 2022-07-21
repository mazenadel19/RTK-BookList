import React, { Fragment, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import BookInfo from "./BookInfo";
import BooksList from "./BooksList";
import { getBooks } from "../../store/slices/bookSlice";

import "./book.css";

const PostContainer = () => {
  const { books, isLoading, isError } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const first = useRef(true);
  
  useEffect(() => {
    if (first.current) {
      dispatch(getBooks());
      first.current = false;
    }
  }, [dispatch]);

  return (
    <Fragment>
      <hr className="my-5" />
      <div className="row">
        <div className="col">
          <BooksList books={books} isLoading={isLoading} isError={isError} />
        </div>
        <div className="col side-line">
          <BookInfo books={books} />
        </div>
      </div>
    </Fragment>
  );
};

export default PostContainer;
