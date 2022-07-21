import React, { useRef } from "react";
import { useDispatch } from "react-redux";
import { login } from "../../store/slices/authSlice";
import "./Login.css";

const Login = () => {
  const username = useRef(null);

  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ username: username.current.value }));
    // username.current.value = "";
  };

  return (
    <div className="Login">
      <form className="form-signin text-center" onSubmit={handleSubmit}>
        <h1 className="h3 mb-3 font-weight-normal">Enter Your Username</h1>
        <label htmlFor="username" className="sr-only">
          Username
        </label>
        <input
          type="text"
          className="mb-3 form-control"
          placeholder="Username"
          required
          autoFocus
          ref={username}
        />
        <button className="btn btn-lg btn-primary btn-block" type="submit">
          Sign in
        </button>
      </form>
    </div>
  );
};

export default Login;
