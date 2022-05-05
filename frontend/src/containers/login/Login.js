import React, { useState, useEffect } from "react";
import { login } from "./../../actions/auth";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { checkAuthenticated, load_user } from "./../../actions/auth";
import "./Login.scss";
import TextField from "@mui/material/TextField";
import logo from "./../../layouts/sasollogo.png";

const Login = () => {
  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const loginFailed = useSelector((state) => state.auth.loginFailed);

  const [error, setError] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const { username, password } = formData;

  const onChange = (e) => {
    setError(false);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(login(username, password));
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      dispatch(login(username, password));
    }
  };

  useEffect(() => {
    dispatch(checkAuthenticated());
    dispatch(load_user());
  }, []);

  useEffect(() => {
    if (loginFailed) {
      setError(true);
      setFormData({
        username: "",
        password: "",
      });
    }
  }, [loginFailed]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <div className="main-container">
      <div className="left-container">
        <div>
            <img src={logo} alt="logo" style={{width:'50%'}} />
          <h2 style={{ color: "white" }}>
            Alkylates Inventory Planning Platform{" "}
          </h2>
          
        </div>
      </div>
      <div className="right-container">
        <div>
          <div className="form-signin" >
          <h2 style={{ color: "black" }} className="title-container">
            Alkylates Inventory Planning Platform{" "}
          </h2>
          <p style={{ color: "black" }}>
            Please sign in with your Sasol credentials
          </p>
            <TextField
              id="outlined-basic"
              label="Username"
              variant="outlined"
              value={username}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              name="username"
              style={{marginBottom:'1rem'}}
            />

            <TextField
              id="outlined-"
              label="Password"
              variant="outlined"
              value={password}
              onChange={onChange}
              onKeyDown={handleKeyDown}
              type="password"
              name="password"
              style={{marginBottom:'1rem'}}
            />

            <button
              className="btn btn-lg  btn-block"
              style={{backgroundColor:'#00a8ff',color:'white'}}
              type="submit"
              onClick={onSubmit}
            >
              Log in
            </button>

            {error && (
              <div className="alert alert-danger">
                Your username and password did not match. Please try again.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
