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
       
         
      </div>

      <div className="content-tabs">
        <div
          className={toggleState === 1 ? "content  active-content" : "content"}
        >
          <div className="viewOptions">
            <div
              
              onClick={() => setActive("Product Specification")}
            >
              <p className="option">

              Product Specification
              </p>
            </div>
            <div
              
              onClick={() => setActive("Feedstock Quality")}
            >
              <p className="option">

              Feedstock Quality
              </p>
            </div>
            <div
              
              onClick={() => setActive("Feedstock Consumption / Yield")}
            >
              <p className="option">
                
              Feedstock Consumption / Yield
                </p> 
            </div>
            <div
              
              onClick={() => setActive("Raw Material Price")}
            >
             <p className="option">
             Raw Material Price
               </p> 
               
            </div>
            <div
              
              onClick={() => setActive("LAB Sales Forecast & Price")}
            >
             <p className="option">
             LAB Sales Forecast & Price
               </p>
            </div>
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
            <div
              
              onClick={() => setActive("Product Specification")}
            >
             <p className="option">
               get_planned
               </p> 
            </div>
            <div
              
              onClick={() => setActive("Feedstock Quality")}
            >
              <p className="option">

              get_inputs
              </p>
            </div>
            <div
              
              onClick={() => setActive("Feedstock Consumption / Yield")}
            >
            <p className="option">
              
               get_quality
              </p> 
            </div>
            <div
              
              onClick={() => setActive("Raw Material Price")}
            >
             <p className="option">
               get_res
               </p> 
            </div>
            <div
              
              onClick={() => setActive("LAB Sales Forecast & Price")}
            >
              
             <p className="option">
               get_prices
               </p> 
            </div>
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
