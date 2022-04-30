import React, { useState } from "react";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";
import TableData from '../../../Data/inputData.json'
import ReadOnlyRow from "./ReadOnlyRow";
import EditableRow from "./EditableRow";

function FSQForm() {
    const [editable, setEditable] = useState(true);

    let headingData = TableData.Headings.map((heading) => {
        return <th>{heading}</th>;
      });

    let bodyData = TableData.Data.map(data =>{
        return  (
            <>
          {/* {editable === data['true']}
            <EditableRow/> */}
            <ReadOnlyRow data={data} />           
            </>
        ) 
    })



  return (
    <div className="fsq__inputContainer">
      <table >
            <thead>
            <tr>
               {headingData}
            </tr>
            </thead>
            <tbody>
          {bodyData}
            </tbody>
        </table>
    </div>
  );
}

export default FSQForm;
