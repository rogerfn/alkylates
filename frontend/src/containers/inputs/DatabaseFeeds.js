import 'ag-grid-community/dist/styles/ag-grid.css';
import 'ag-grid-community/dist/styles/ag-theme-material.css';
import { AgGridReact } from 'ag-grid-react'; // the AG Grid React Component
import { useCallback, useState, useEffect } from "react";
import { ConditionalInputEditor, ConditionalInputRenderer } from "../../components/aggrid/ConditionalInput";
import { API_HOST } from '../../types';
import { Spinner } from 'react-bootstrap';
import axios from "axios";
const DatabaseFeeds = () => {

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
            const res = await axios.post(API_HOST() + "/core/get_inputs/",data, config);
            
        } catch(err) {
            console.log(err);

        }
    }

    const getData = async () => {
        

        try {   
            const res = await axios.get(API_HOST() + "/core/get_inputs/", config);
            setRowData(res.data.data);
            
            setColumnDefs(res.data.headings.map((heading) => { 
    
                    if (heading === "site" || heading === "feedstock") {
                        return { field: heading, pinned: "left" }
                    }
                    return { field: heading, editable:true, width: 120 , cellEditor: ConditionalInputEditor, cellRenderer: ConditionalInputRenderer, cellStyle: params => {
                        if (!params.value[1] ) {
                            //mark police cells as red
                            return {backgroundColor: 'white'};
                        }
                        return {backgroundColor: 'rgb(247 247 247)' };
                    } } 
                
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
                columnDefs={columnDefs}
                rowData={rowData}
                defaultColDef = {{
                    initialWidth: 100,
                    sortable: true,
                    resizable: true,
                    autoHeight: true,
                  }}
                onCellValueChanged={onCellValueChanged}
            />
       
        </div> 
  }
        </div>
        
    );
}



export default DatabaseFeeds;