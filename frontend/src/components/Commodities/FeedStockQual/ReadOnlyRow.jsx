import React from 'react'

const ReadOnlyRow =({data, handleEditClick})=>{
    return(
<tr>
<td>{data.site}</td>
          <td>{data.feedstock}</td>
        <td>{data["% LnP"][0]}</td>
           <td>{data["Benzinetta yield (mt/mt)"][0]}</td>
           <td>{data["C10 recovery"][0]}</td>
           <td>{data["C14 recovery"][0]}</td>
           <td>{data["C15 recovery"][0]}</td>
           <td>{data["C18+ recovery"][0]}</td>
           <td>{data["Electricity yield"][0]}</td>
           <td>{data["Feed yield (mt/mt)"][0]}</td>
           <td>{data["Freight/CIF-FOB premium"][0]}</td>
           <td>{data["Fuel Sarroch yield"][0]}</td>
           <td>{data["Gasoil yield (ton/ton)"][0]}</td>
           <td>{data["H2 rich gas yield"][0]}</td>
           <td>{data["HnP adsorption recovery"][0]}</td>
           <td>{data["LnP adsorption recovery"][0]}</td>
           <td>{data["NG yield"][0]}</td>
           <td>{data["Premium Return (S/mt)"][0]}</td>
           <td>{data["Premium kero ($/mt) Long-Term"][0]}</td>
           <td>{data["Premium kero ($/mt) Med-Term"][0]}</td>
           <td>{data["Return yield (mt/mt)"][0]}</td>
           <td>{data["Useful HnP TnP"][0]}</td>
           <td>{data["Useful LnP TnP"][0]}</td>
           <td>{data["Useful total TnP"][0]}</td>
           <td>{data["VN yield (ton/ton)"][0]}</td>
           <td>{data["density feed (kg/mc)"][0]}</td>
           <td>{data["density return (kg/mc)"][0]}</td>
           <td>{data.loses[0]}</td>
           <td>{data["loses due to cracking"][0]}</td>
           <td>{data["nP purity"][0]}</td>

</tr>
    )
}

export default ReadOnlyRow;