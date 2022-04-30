import React from "react";
import FSCTable from "./FSCTable";
import FSCGraph from "./FSCGraph";

function FeedStockCons({ toggleState }) {
  switch (toggleState) {
    case 1:
      return <FSCGraph />;
    case 2:
      return <FSCTable />;
    case 3:
      return <div>Export Feedstocks Consumption</div>;
    default:
      return <div>Unable to fetch data</div>;
  }
}

export default FeedStockCons;
