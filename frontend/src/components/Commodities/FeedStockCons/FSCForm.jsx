import React from "react";
import Button from "../../button";
import Input from "../../input";
import "../../../styles/Commodities/Forms.css";
import {FaEdit} from 'react-icons/fa'

function FSCForm() {
  return (
    <div className="fsc__inputContainer">
       <table >
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">First</th>
                <th scope="col">Last</th>
                <th scope="col">Handle</th>
                <th scope="col">Handle</th>
                <th scope="col">Handle</th>
                <th scope="col">Handle</th>
                <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
                <td>1</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>Mark</td>
                
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
                <td>@mdo</td>
            </tr>
            <tr>
                <td >2</td>
                <td>Jacob</td>
                <td>Thornton</td>
                <td>Mark</td>
                <td>Otto</td>
                <td>@fat</td>
                <td>@fat</td>
                <td>@fat</td>
                
                <td>
                    <FaEdit/>
                </td>
            </tr>
            <tr>
                <td >3</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
            </tr>
            <tr>
                <td >4</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>
                    <FaEdit/>
                </td>
            </tr>
            <tr>
                <td >5</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
            </tr>
            <tr>
                <td >6</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>
                    <FaEdit/>
                </td>
            </tr>
            <tr>
                <td >7</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
            </tr>
            <tr>
                <td >8</td>
                <td>Larry</td>
                <td>the Bird</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>@twitter</td>
                <td>
                    <FaEdit/>
                </td>
            </tr>
            </tbody>
        </table>
    </div>
  );
}

export default FSCForm;
