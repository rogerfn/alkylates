import React from "react";
import "../../../styles/Commodities/Forms.css";
import TableData from '../../../Data/inputData.json'
import ReadOnlyRow from "./ReadOnlyRow";

function FSQForm() {
    

    let headingData = TableData.Headings.map((heading) => {
        return <th>{heading}</th>;
      });

    let bodyData = TableData.Data.map(data =>{
        return  (
            <>

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
