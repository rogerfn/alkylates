import React from "react";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";
import Button from "../../button";

function FSQForm() {
  return (
    <div className="fsq__inputContainer">
      <Input type="text" placeholder="Value 1" />
      <Input type="text" placeholder="Value 2" />
      <Input type="text" placeholder="Value 3" />
      <Input type="text" placeholder="Value 4" />
      <Input type="text" placeholder="Value 5" />
      <Button type="button" value="Submit" />
    </div>
  );
}

export default FSQForm;
