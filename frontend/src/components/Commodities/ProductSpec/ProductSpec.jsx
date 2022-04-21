import React from "react";
import PSForm from "./PSForm";
import PSGraph from "./PSGraph";

function ProductSpec({ toggleState }) {
  switch (toggleState) {
    case 1:
      return <PSGraph />;
    case 2:
      return <PSForm />;
    case 3:
      return <div>Export Product Specification</div>;
    default:
      return <div>Unable to fetch data</div>;
  }
}

export default ProductSpec;
