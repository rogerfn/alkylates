import React from "react";
import Button from "../../button";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";
import {FaEdit} from 'react-icons/fa'
import TableData from '../../../Data/homologueData.json'
import ReadOnlyRow from "./ReadOnlyRow";

function FSCForm() {
     
    let headingData = TableData.Headings.map((heading) => {
        return <th>{heading}</th>;
      });
    
    let bodyData = TableData.Data.map(data =>{
        return  (
            
            <ReadOnlyRow data={data} />           
        ) 
    })

    

    console.log(TableData)
  return (
    <div className="fsc__inputContainer">    
       <table >
            <thead>
            <tr >
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

export default FSCForm;
