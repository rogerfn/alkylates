import React from "react";
import FSQForm from "./FSQForm";
import FSQGraph from "./FSQGraph";

function FeedStockQual({ toggleState }) {
  switch (toggleState) {
    case 1:
      return <FSQGraph />;
    case 2:
      return <FSQForm />;
    case 3:
      return <div>Export Feedstocks Quality</div>;
    default:
      return <div>Unable to fetch data</div>;
  }
}

export default FeedStockQual;
