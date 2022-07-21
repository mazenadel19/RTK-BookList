import React from "react";

function Book({ title }) {
  return (
    <li className="list-group-item d-flex  justify-content-between align-items-center">
      <div>{title}</div>
      <div className="btn-group" role="group">
        <button type="button" className="btn btn-primary">
          Read
        </button>
        <button type="button" className="btn btn-danger">
          Delete
        </button>
      </div>
    </li>
  );
}

function Books({ books, isError }) {
  if (isError) {
    return <p>There's no books available!</p>;
  }

  return books?.map(({ title, id }) => {
    return <Book key={id} title={title} />;
  });
}

const BooksList = ({ books, isLoading, isError }) => {
  return (
    <div>
      <h2>Books List</h2>
      <ul className="list-group">
        {isLoading ? (
          <p>Fetching...</p>
        ) : (
          <Books books={books} isError={isError} />
        )}
      </ul>
    </div>
  );
};

export default BooksList;
