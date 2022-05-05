import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-material.css";
import { AgGridReact } from "ag-grid-react"; // the AG Grid React Component
import axios from "axios";
import { useCallback, useEffect, useRef, useState } from "react";
import { Spinner } from "react-bootstrap";
import { API_HOST } from "../../types";
import Select from "react-select";
const VariableCost = () => {
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("access")}`,
      Accept: "application/json",
    },
  };
  const [rowData, setRowData] = useState([]); // Set rowData to Array of Objects, one Object per Row
  const [loading, setLoading] = useState(true);
  // Each Column Definition results in one Column.
  const gridRef = useRef();

  const categoryOptions = [
    { value: "Return Stream Price", label: "Return Stream Price" },
    { value: "Feedstock Price", label: "Feedstock Price" },
    { value: "Feedstock Premium", label: "Feedstock Premium" },
    { value: "Energy Costs", label: "Energy Costs" },
    { value: "Other Costs", label: "Other Costs" },
    { value: "np value in feed", label: "np value in feed" },
    { value: "Variable Costs", label: "Variable Costs" },
    { value: "Adder", label: "Adder" },
    { value: "LnP Production", label: "LnP Production" },
  ];

  const [category, setCategory] = useState(categoryOptions[0]);

  const currencyOptions = [
    { value: "Dollar", label: "USD" },
    { value: "Euro", label: "EUR" },
  ];

  const [currency, setCurrency] = useState(currencyOptions[0]);

  const siteOptions = [
    { value: "Augusta", label: "Augusta" },
    { value: "Olefin purch", label: "Olefin purch" },
    { value: "Sarroch", label: "Sarroch" },
    { value: "np purch", label: "np purch" },
  ];

  const [site, setSite] = useState(siteOptions[0]);

  const [columnDefs, setColumnDefs] = useState([]);

  const onCellValueChanged = useCallback((event) => {
    console.log("Data after change is", event.data);
    postData(event.data);
  }, []);

  const onFirstDataRendered = useCallback((params) => {
    gridRef.current.api.sizeColumnsToFit();
  }, []);

  const postData = async (data) => {
    try {
        
      const res = await axios.post(API_HOST() + "/core/get_res/", data, config);
    } catch (err) {
      console.log(err);
    }
  };

  const getData = async () => {
    try {

        let configuration ={ ...config };
        configuration.params = {
            category: category.value,
            currency: currency.value,
            site: site.value,
        };

      setLoading(true);

      const res = await axios.get(API_HOST() + "/core/get_res/", configuration);

      setLoading(false);

      setRowData(res.data.data);

      setColumnDefs(
        res.data.headings.map((heading) => {
          if (heading === "index") {
            return { field: heading, pinned: "left", width: 120 };
          }

          return { field: heading, editable: true, width: 120 };
        })
      );
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, [, currency, category, site]);

  return (
    <div>
      <div className="d-flex mb-1">
        <div className="m-2">
          <Select
            value={category}
            onChange={(e) => setCategory(e)}
            options={categoryOptions}
          />
        </div>
        <div className="m-2">
          <Select
            value={currency}
            onChange={(e) => setCurrency(e)}
            options={currencyOptions}
          />
        </div>
        <div className="m-2">
          <Select
            value={site}
            onChange={(e) => setSite(e)}
            options={siteOptions}
          />
        </div>
      </div>
      {loading && <Spinner animation="border" variant="primary" />}
      {!loading && (
        <div
          className="ag-theme-material"
          style={{ width: "100%", height: 500 }}
        >
          <AgGridReact
            ref={gridRef}
            columnDefs={columnDefs}
            rowData={rowData}
            defaultColDef={{
              initialWidth: 100,
              sortable: true,
              resizable: true,
            }}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      )}
    </div>
  );
};

export default VariableCost;
