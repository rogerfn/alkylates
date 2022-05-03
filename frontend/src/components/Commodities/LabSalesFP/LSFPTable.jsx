import React from "react";
import "../../../styles/Commodities/Forms.css";
import Button from "../../button";
import {FaEdit} from 'react-icons/fa'
import TableData from '../../../Data/priceData.json'
import ReadOnlyRows from "./ReadOnlyRows";


function LSFPTable() {

    let headingData = TableData.date.map((heading) => {
        return <th>{heading}</th>;
      });
    
    let bodyData = TableData.Data.map(data =>{
        return  (
            
            <ReadOnlyRows data={data} />           
        ) 
    })





  return (
    <div className="lsfp__inputContainer">
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

export default LSFPTable;
