import React from "react";
import "../styles/authModal.css";
import Input from "./input";
import { BsFillPersonFill } from "react-icons/bs";
import { RiLockPasswordFill } from "react-icons/ri";
import Button from "./button";
import { NavLink } from "react-router-dom";

function AuthModal() {
  return (
    <div className="authModal__container">
      <img
        className="authModal__logo"
        src="https://seeklogo.com/images/S/Sasol_new-logo-96702A2FFA-seeklogo.com.png"
        alt="logo"
      />
      <h2 className="authModal__welcomeText">Welcome</h2>
      <div className="authModal__inputContainer">
        <div className="authModal__personIcon">
          <BsFillPersonFill style={{ fontSize: "20px" }} />
        </div>
        <Input type="text" placeholder="Email" />
        <div className="authModal__passwordIcon">
          <RiLockPasswordFill style={{ fontSize: "20px" }} />
        </div>
        <Input type="text" placeholder="Password" />
      </div>
      <p className="authModal__createAccount"></p>
      <NavLink to="/home" style={{ textDecoration: "none" }}>
        <Button type="button" value="Login" />
      </NavLink>
    </div>
  );
}

export default AuthModal;
