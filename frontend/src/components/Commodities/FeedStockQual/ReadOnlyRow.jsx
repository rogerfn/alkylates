import React, { useState } from 'react'
import '../../../styles/Commodities/Forms.css'

const ReadOnlyRow =({data})=>{
    const [editable, setEditable] = useState(null);

    const [updateCellValue, setUpdatedCellValue] = useState({
        ["% LnP"] : '',
        ["Benzinetta yield (mt/mt)"] :'',
        ["C10 recovery"] : '',
        ["C14 recovery"] : '',
        ["C15 recovery"] : '',
        ["C18+ recovery"] : '',
        ["Electricity yield"] : '',
        ["Feed yield (mt/mt)"] : '',
        ["Freight/CIF-FOB premium"] : '',
        ["Fuel Sarroch yield"] : '',
        ["Gasoil yield (ton/ton)"] : '',
        ["H2 rich gas yield"] : '',
        ["HnP adsorption recovery"] : '',
        ["LnP adsorption recovery"] : '',
        ["NG yield"] : '',
        ["Premium Return (S/mt)"] : '',
        ["Premium kero ($/mt) Long-Term"] : '',
        ["Premium kero ($/mt) Med-Term"] : '',
        ["Return yield (mt/mt)"] : '',
        ["Useful HnP TnP"] : '',
        ["Useful LnP TnP"] : '',
        ["Useful total TnP"] : '',
        ["VN yield (ton/ton)"] : '',
        ["density feed (kg/mc)"] : '',
        ["density return (kg/mc)"] : '',
        loses : '',
        ["loses due to cracking"]: '',
        ["nP purity"]: '',
    })

    const handleClick =(e, data )=>{
        e.preventDefault();
                setEditable(data["% LnP"][2])
    }
    
    const handleClick2 =(e, data )=>{
        e.preventDefault();
                setEditable(data["C10 recovery"][2])
    }
    


    return(
<tr>
<td>{data.site}</td>
          <td>{data.feedstock}</td>
          {editable === data["% LnP"][2] ? 
          <input type="number" required='required' placeholder={data['% LnP'][0]} name='% LnP' /> :
           <td onClick={(e)=> handleClick(e, data)}>{data["% LnP"][0]}</td>}
            {editable ===  data["Benzinetta yield (mt/mt)"][1] ? <input type="number" required='required' placeholder='Enter value' name='Benzinetta yield (mt/mt)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Benzinetta yield (mt/mt)"][0]}</td> }
           {editable ===  data["C10 recovery"][2] ? <input type="number" required='required' placeholder={data['C10 recovery'][0]} name='C10 recovery' /> : <td onClick={(e)=> handleClick2(e, data)}>{data["C10 recovery"][0]}</td>}
           {editable ===  data["C14 recovery"][1] ? <input type="number" required='required' placeholder='Enter value' name='C14 recovery' /> : <td onClick={(e)=> handleClick(e, data)}>{data["C14 recovery"][0]}</td> }
           {editable ===  data["C15 recovery"][1] ? <input type="number" required='required' placeholder='Enter value' name='C15 recovery' /> : <td onClick={(e)=> handleClick(e, data)}>{data["C15 recovery"][0]}</td>}
           {editable ===  data["C18+ recovery"][1] ? <input type="number" required='required' placeholder='Enter value' name='C18+ recovery' /> : <td onClick={(e)=> handleClick(e, data)}>{data["C18+ recovery"][0]}</td>}
          {editable ===  data["Electricity yield"][1] ? <input type="number" required='required' placeholder='Enter value' name='Electricity yield' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Electricity yield"][0]}</td>}
           {editable ===  data["Feed yield (mt/mt)"][1] ? <input type="number" required='required' placeholder='Enter value' name='Feed yield (mt/mt)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Feed yield (mt/mt)"][0]}</td> }
           {editable ===  data["Freight/CIF-FOB premium"][1] ? <input type="number" required='required' placeholder='Enter value' name='Freight/CIF-FOB premium' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Freight/CIF-FOB premium"][0]}</td> }
           {editable ===  data["Fuel Sarroch yield"][1] ? <input type="number" required='required' placeholder='Enter value' name='Fuel Sarroch yield' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Fuel Sarroch yield"][0]}</td> }
           {editable ===  data["Gasoil yield (ton/ton)"][1] ? <input type="number" required='required' placeholder='Enter value' name='Gasoil yield (ton/ton)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Gasoil yield (ton/ton)"][0]}</td> }
           {editable ===  data["H2 rich gas yield"][1] ? <input type="number" required='required' placeholder='Enter value' name='H2 rich gas yield' /> : <td onClick={(e)=> handleClick(e, data)}>{data["H2 rich gas yield"][0]}</td>}
           {editable ===  data["HnP adsorption recovery"][1] ? <input type="number" required='required' placeholder='Enter value' name='HnP adsorption recovery' /> : <td onClick={(e)=> handleClick(e, data)}>{data["HnP adsorption recovery"][0]}</td>}
           {editable ===  data["LnP adsorption recovery"][1] ? <input type="number" required='required' placeholder='Enter value' name='LnP adsorption recovery' /> : <td onClick={(e)=> handleClick(e, data)}>{data["LnP adsorption recovery"][0]}</td>}
           {editable ===  data["NG yield"][1] ? <input type="number" required='required' placeholder='Enter value' name='NG yield' /> : <td onClick={(e)=> handleClick(e, data)}>{data["NG yield"][0]}</td>}
           {editable ===  data["Premium Return (S/mt)"][1] ?  <input type="number" required='required' placeholder='Enter value' name='Premium Return (S/mt)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Premium Return (S/mt)"][0]}</td>}
           {editable ===  data["Premium kero ($/mt) Long-Term"][1] ? <input type="number" required='required' placeholder='Enter value' name='Premium kero ($/mt) Long-Term' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Premium kero ($/mt) Long-Term"][0]}</td>}
           {editable ===  data["Premium kero ($/mt) Med-Term"][1] ? <input type="number" required='required' placeholder='Enter value' name='Premium kero ($/mt) Med-Term' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Premium kero ($/mt) Med-Term"][0]}</td>}
           {editable ===  data["Return yield (mt/mt)"][1] ? <input type="number" required='required' placeholder='Enter value' name='Return yield (mt/mt)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Return yield (mt/mt)"][0]}</td> }
           {editable ===  data["Useful HnP TnP"][1] ?  <input type="number" required='required' placeholder='Enter value' name='Useful HnP TnP' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Useful HnP TnP"][0]}</td> }
           {editable ===  data["Useful LnP TnP"][1] ? <input type="number" required='required' placeholder='Enter value' name='Useful LnP TnP' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Useful LnP TnP"][0]}</td> }
           {editable ===  data["Useful total TnP"][1] ? <input type="number" required='required' placeholder='Enter value' name='Useful total TnP' /> : <td onClick={(e)=> handleClick(e, data)}>{data["Useful total TnP"][0]}</td> }
           {editable ===  data["VN yield (ton/ton)"][1] ?  <input type="number" required='required' placeholder='Enter value' name='VN yield (ton/ton)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["VN yield (ton/ton)"][0]}</td> }
           {editable ===  data["density feed (kg/mc)"][1] ?  <input type="number" required='required' placeholder='Enter value' name='density feed (kg/mc)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["density feed (kg/mc)"][0]}</td> }
           {editable ===  data["density return (kg/mc)"][1] ?  <input type="number" required='required' placeholder='Enter value' name='density return (kg/mc)' /> : <td onClick={(e)=> handleClick(e, data)}>{data["density return (kg/mc)"][0]}</td> }
           {editable ===  data["loses"][1] ? <input type="number" required='required' placeholder='Enter value' name='loses' /> : <td onClick={(e)=> handleClick(e, data)}>{data.loses[0]}</td>}
           {editable ===  data["loses due to cracking"][1] ? <input type="number" required='required' placeholder='Enter value' name='loses due to cracking' /> : <td onClick={(e)=> handleClick(e, data)}>{data["loses due to cracking"][0]}</td> }
           {editable ===  data["nP purity"][1] ? <input type="number" required='required' placeholder='Enter value' name='nP purity' /> : <td onClick={(e)=> handleClick(e, data)}>{data["nP purity"][0]}</td> }
           

</tr>
    )
}

export default ReadOnlyRow;