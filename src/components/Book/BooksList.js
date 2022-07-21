import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteBook } from "../../store/slices/bookSlice";

function Book({ book, isLoading }) {

  const dispatch = useDispatch();
  const { username } = useSelector((state) => state.auth);

  const handleDelete = () => {
    dispatch(deleteBook(book.id));
  };

  return (
    <li className="list-group-item d-flex  justify-content-between align-items-center">
      <div>{book.title}</div>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary" disabled={isLoading}>
          Read
        </button>
        {book.username === username && (
          <button
            type="button"
            className="btn btn-danger"
            disabled={isLoading}
            onClick={handleDelete}
          >
            Delete
          </button>
        )}
      </div>
    </li>
  );
}

function Books({ books, isLoading }) {

  if (books?.length === 0) {
    return <p>your book list is empty</p>;
  }

  return books?.map((book) => {
    return <Book key={book.id} book={book} isLoading={isLoading} />;
  });
}

const BooksList = ({ books, isLoading }) => {

  return (
    <div>
      <h2>Books List</h2>
      <ul className="list-group">
        <Books books={books} isLoading={isLoading} />
      </ul>
    </div>
  );
};

export default BooksList;
