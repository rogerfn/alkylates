import React from "react";
import Button from "../../button";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";
import TableData from '../../../Data/resData.json'
import ReadOnlyRows from "./ReadOnlyRows";


function RMPTable() {


  let headingData = TableData.index.map((heading) => {
    return <th>{heading}</th>;
  });

let bodyData = TableData.Data.map(data =>{
    return  (
      
        <ReadOnlyRows data={data} />           
    ) 
})



  return (
    <div className="rmp__inputContainer">
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

export default RMPTable;
