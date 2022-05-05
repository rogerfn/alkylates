import 'ag-grid-community/dist/styles/ag-grid.css';
//import 'ag-grid-community/dist/styles/ag-theme-alpine.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from 'react-bootstrap';
import { API_HOST } from '../../types';
const RawMaterialPricing = () => {
    const gridRef = useRef();

    const config = {
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("access")}`,
            Accept: "application/json",

        },
    }
    const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
    const [loading, setLoading] = useState(true);
    // Each Column Definition results in one Column.

    
    const [columnDefs, setColumnDefs] = useState([]);

    const onCellValueChanged = useCallback((event) => {
        console.log('Data after change is', event.data);
        postData(event.data);
      }, []);

    const postData = async (data) => {
        try {   
            const res = await axios.post(API_HOST() + "/core/get_price/",data, config);
            
        } catch(err) {
            console.log(err);

        }
    }

    const getData = async () => {
        

        try {   
            const res = await axios.get(API_HOST() + "/core/get_price/", config);
            setRowData(res.data.data);
            
            setColumnDefs(res.data.headings.map((heading) => { 
    
                    if (heading === "unit" || heading === "commodity" || heading === "source") {
                        return { field: heading, pinned: "left" }
                    }

                    return { field: heading, editable:true, width: 150} 
                
                }));
            setLoading(false);
        } catch(err) {
            console.log(err);

        }
    }



            

    useEffect(() => {

        getData();
    }, []);

    return (
        <div>
         {loading && <Spinner animation="border" variant="primary" /> }
         {!loading && <div className="ag-theme-material" style={{width: '100%', height: 500}}>
            <AgGridReact
            ref={gridRef}
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef = {{
                    initialWidth: 100,
                    sortable: true,
                    resizable: true,
                  }}
                onCellValueChanged={onCellValueChanged}
            />
       
        </div> 
  }
        </div>
        
    );
}



export default RawMaterialPricing;