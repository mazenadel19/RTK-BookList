import React, { Fragment } from "react";

const BookInfo = ({ book }) => {
  if (!book) {
    return (
      <>
        <h2>Book Details</h2>
        <div className="alert alert-secondary" role="alert">
          No book was selected.
        </div>
      </>
    );
  }

  return (
    <Fragment>
      <div className="jumbotron ">
        <p className="font-weight-bold">Title: {book.title}</p>
        <p className="font-weight-light">Description: {book.description}</p>
        <p className="font-italic">Price: {book.price}</p>
        <p className="font-italic">Added by: {book.username}</p>
      </div>
    </Fragment>
  );
};

export default BookInfo;
