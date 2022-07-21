import React, { Fragment } from "react";
import { useSelector } from "react-redux";

import Header from "./components/Header";
import Container from "./components/Container";
import AddForm from "./components/AddForm";
import BookContainer from "./components/Book/BookContainer";
import Login from "./components/Login/Login";

import "./App.css";

const App = () => {
  const { isLoggedIn } = useSelector((state) => state.auth);

  return (
    <Fragment>
      <Header />
      {isLoggedIn ? (
        <Container>
          <AddForm />
          <BookContainer />
        </Container>
      ) : (
        <Login />
      )}
    </Fragment>
  );
};

export default App;
