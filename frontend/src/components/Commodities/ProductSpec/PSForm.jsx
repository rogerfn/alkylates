import React from "react";
import Button from "../../button";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";

function PSForm() {
  return (
    <div className="ps__inputContainer">
      <Input type="text" placeholder="Value 1" />
      <Input type="text" placeholder="Value 2" />
      <Input type="text" placeholder="Value 3" />
      <Input type="text" placeholder="Value 4" />
      <Input type="text" placeholder="Value 5" />
      <Button type="button" value="Submit" />
    </div>
  );
}

export default PSForm;
