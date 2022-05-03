import React from "react";
import Button from "../../button";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";
import {FaEdit} from 'react-icons/fa'
import TableData from '../../../Data/plannedData.json'
import ReadOnlyRows from "./ReadOnlyRows";


function PSTable() {

    let headingData = TableData.date.map((heading) => {
        return <th>{heading}</th>;
      });
    
    let bodyData = TableData.Data.map(data =>{
        return  (
           
            <ReadOnlyRows data={data} />           
        ) 
    })





  return (
    <div className="ps__inputContainer">
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

export default PSTable;
