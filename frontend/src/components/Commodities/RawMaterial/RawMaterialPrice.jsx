import React from "react";
import RMPForm from "./RMPForm";
import RMPGraph from "./RMPGraph";

function RawMaterialPrice({ toggleState }) {
  switch (toggleState) {
    case 1:
      return <RMPGraph />;
    case 2:
      return <RMPForm />;
    case 3:
      return <div>Export Raw Material Price</div>;
    default:
      return <div>Unable to fetch data</div>;
  }
}

export default RawMaterialPrice;
