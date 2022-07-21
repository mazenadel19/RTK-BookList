import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/slices/authSlice";

const Header = () => {
  const { isError } = useSelector((state) => state.books);
  const dispatch = useDispatch();
  const { isLoggedIn } = useSelector((state) => state.auth);

  const handlelogout = () => {
    dispatch(logout());
  };

  return (
    <>
      {isError && (
        <div className="alert alert-danger m-0" role="alert">
          {isError}
        </div>
      )}
      <nav className="navbar navbar-dark bg-dark">
        <span className="navbar-brand mb-0 h1">RTK-BookList</span>

        {isLoggedIn && (
          <button
            className="btn btn-outline-primary"
            type="button"
            onClick={handlelogout}
          >
            Logout
          </button>
        )}
      </nav>
    </>
  );
};

export default Header;
