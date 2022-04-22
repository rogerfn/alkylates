import React, { useState } from "react";
import "../styles/homeTabs.css";
import FeedStockCons from "./Commodities/FeedStockCons/FeedStockCons";
import FeedStockQual from "./Commodities/FeedStockQual/FeedStockQual";
import LabSalesFP from "./Commodities/LabSalesFP/LabSalesFP";
import ProductSpec from "./Commodities/ProductSpec/ProductSpec";
import RawMaterialPrice from "./Commodities/RawMaterial/RawMaterialPrice";

function HomeTabs() {
  const [toggleState, setToggleState] = useState(1);

  const toggleTab = (index) => {
    setToggleState(index);
  };

  const [active, setActive] = useState("Product Specification");
  return (
    <div className="container">
      <div className="bloc-tabs">
        <button
          className={toggleState === 1 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(1)}
        >
          View
        </button>
        <button
          className={toggleState === 2 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(2)}
        >
          Update | Input
        </button>
        <button
          className={toggleState === 3 ? "tabs active-tabs" : "tabs"}
          onClick={() => toggleTab(3)}
        >
          Export
        </button>
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className="viewOptions">
            <button
              className="option"
              onClick={() => setActive("Product Specification")}
            >
              Product Specification
            </button>
            <button
              className="option"
              onClick={() => setActive("Feedstock Quality")}
            >
              Feedstock Quality
            </button>
            <button
              className="option"
              onClick={() => setActive("Feedstock Consumption / Yield")}
            >
              Feedstock Consumption / Yield
            </button>
            <button
              className="option"
              onClick={() => setActive("Raw Material Price")}
            >
              Raw Material Price
            </button>
            <button
              className="option"
              onClick={() => setActive("LAB Sales Forecast & Price")}
            >
              LAB Sales Forecast & Price
            </button>
          </div>
          <div className="optionPage__container">
            {active === "Product Specification" && (
              <ProductSpec toggleState={toggleState} />
            )}
            {active === "Feedstock Quality" && (
              <FeedStockQual toggleState={toggleState} />
            )}
            {active === "Feedstock Consumption / Yield" && (
              <FeedStockCons toggleState={toggleState} />
            )}
            {active === "Raw Material Price" && (
              <RawMaterialPrice toggleState={toggleState} />
            )}
            {active === "LAB Sales Forecast & Price" && (
              <LabSalesFP toggleState={toggleState} />
            )}
          </div>
        </div>

        <div
          className={toggleState === 2 ? "content  active-content" : "content"}
        >
          <div className="viewOptions">
            <button
              className="option"
              onClick={() => setActive("Product Specification")}
            >
              Product Specification
            </button>
            <button
              className="option"
              onClick={() => setActive("Feedstock Quality")}
            >
              Feedstock Quality
            </button>
            <button
              className="option"
              onClick={() => setActive("Feedstock Consumption / Yield")}
            >
              Feedstock Consumption / Yield
            </button>
            <button
              className="option"
              onClick={() => setActive("Raw Material Price")}
            >
              Raw Material Price
            </button>
            <button
              className="option"
              onClick={() => setActive("LAB Sales Forecast & Price")}
            >
              LAB Sales Forecast & Price
            </button>
          </div>
          <div className="optionPage__container">
            {active === "Product Specification" && (
              <ProductSpec toggleState={toggleState} />
            )}
            {active === "Feedstock Quality" && (
              <FeedStockQual toggleState={toggleState} />
            )}
            {active === "Feedstock Consumption / Yield" && (
              <FeedStockCons toggleState={toggleState} />
            )}
            {active === "Raw Material Price" && (
              <RawMaterialPrice toggleState={toggleState} />
            )}
            {active === "LAB Sales Forecast & Price" && (
              <LabSalesFP toggleState={toggleState} />
            )}
          </div>
        </div>

        <div
          className={toggleState === 3 ? "content  active-content" : "content"}
        >
          <div className="viewOptions">
            <button
              className="option"
              onClick={() => setActive("Product Specification")}
            >
              Product Specification
            </button>
            <button
              className="option"
              onClick={() => setActive("Feedstock Quality")}
            >
              Feedstock Quality
            </button>
            <button
              className="option"
              onClick={() => setActive("Feedstock Consumption / Yield")}
            >
              Feedstock Consumption / Yield
            </button>
            <button
              className="option"
              onClick={() => setActive("Raw Material Price")}
            >
              Raw Material Price
            </button>
            <button
              className="option"
              onClick={() => setActive("LAB Sales Forecast & Price")}
            >
              LAB Sales Forecast & Price
            </button>
          </div>
          <div className="optionPage__container">
            {active === "Product Specification" && (
              <ProductSpec toggleState={toggleState} />
            )}
            {active === "Feedstock Quality" && (
              <FeedStockQual toggleState={toggleState} />
            )}
            {active === "Feedstock Consumption / Yield" && (
              <FeedStockCons toggleState={toggleState} />
            )}
            {active === "Raw Material Price" && (
              <RawMaterialPrice toggleState={toggleState} />
            )}
            {active === "LAB Sales Forecast & Price" && (
              <LabSalesFP toggleState={toggleState} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTabs;
