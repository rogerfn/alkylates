import React from "react";
import Button from "../../button";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";
import {FaEdit} from 'react-icons/fa'
import TableData from '../../../Data/homologueData.json'

function FSCForm() {
     

    
    let bodyData = TableData.homologue.map(data =>{
        return  (
<tr>

    <td>{data.site}</td>
    <td>{data.feedstock}</td>
    <td>{data.c10}</td>
    <td>{data.c11}</td>
    <td>{data.c12}</td>
    <td>{data.c13}</td>
    <td>{data.c14}</td>
    <td>{data.c15}</td>
    <td>{data.c16}</td>
    <td>{data.c17}</td>
    <td>{data["c18+"]}</td>
    <td>{data["c9-"]}</td>
    <td>{data.TNP}</td>
   
</tr>
        ) 
    })

    

    console.log(TableData)
  return (
    <div className="fsc__inputContainer">    
       <table >
            <thead>
            <tr >
              <th scope="col">Col-1</th>
              <th scope="col">Col-2</th>
              <th scope="col">Col-3</th>
              <th scope="col">Col-4</th>
              <th scope="col">Col-5</th>
              <th scope="col">Col-6</th>
              <th scope="col">Col-7</th>
              <th scope="col">Col-8</th>
              <th scope="col">Col-9</th>
              <th scope="col">Col-10</th>
              <th scope="col">Col-11</th>
              <th scope="col">Col-12</th>
              <th scope="col">Col-13</th>
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
