import React from "react";
import "../styles/button.css";

function Button({ type, value }) {
  return <input className="button__" type={type} value={value} />;
}

export default Button;
