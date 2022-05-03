import React from "react";
import LSFPForm from "./LSFPTable";
import LSFPGraph from "./LSFPGraph";

function LabSalesFP({ toggleState }) {
  switch (toggleState) {
    case 1:
      return <LSFPGraph />;
    case 2:
      return <LSFPForm />;
    case 3:
      return <div>Export LAB Sales Forecast & Price</div>;
    default:
      return <div>Unable to fetch data</div>;
  }
}

export default LabSalesFP;
