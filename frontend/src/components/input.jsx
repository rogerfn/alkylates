import React from "react";
import "../styles/input.css";

function Input({ type, placeholder, icon }) {
  return (
    <>
      <input
        className="input__"
        type={type}
        placeholder={placeholder}
        icon={icon}
      ></input>
    </>
  );
}

export default Input;
