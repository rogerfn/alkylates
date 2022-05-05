import "ag-grid-community/dist/styles/ag-grid.css";
import "ag-grid-community/dist/styles/ag-theme-alpine.css";
import { useState } from "react";
import { BsGraphUp, BsUpload } from "react-icons/bs";
import DatabaseFeeds from "./DatabaseFeeds";
import FeedstockQuality from "./FeedstockQuality";
import PlanningData from "./PlanningData";
import VariableCost from "./VariableCost";

import "./Inputs.scss";
import RawMaterialPricing from "./RawMaterialPricing";
const SectionTab = ({ icon, title, active, onClick }) => {
  return (
    <a
      href="#"
      onClick={(e) => {
        e.preventDefault();
        onClick();
      }}
    >
      <div
        className={`p-4 bd-highlight input-section ${active ? "active" : ""}`}
      >
        {icon} {title}
      </div>
    </a>
  );
};

const Inputs = () => {
  const [tab, setTab] = useState("database");

  return (
    <div>
      
      <div className="container-fluid mt-5">
        <div className="d-flex flex-row bd-highlight mb-3 section-tab">
          <SectionTab
            icon={<BsGraphUp></BsGraphUp>}
            title="DATABASE FEEDS"
            active={tab === "database"}
            onClick={() => setTab("database")}
          />
          <SectionTab
            icon={<BsUpload></BsUpload>}
            title="FEEDSTOCK QUALITY"
            active={tab === "feedstock"}
            onClick={() => setTab("feedstock")}
          />
          <SectionTab
            icon={<BsUpload></BsUpload>}
            title="RAW MATERIAL PRICING"
            active={tab === "raw"}
            onClick={() => setTab("raw")}
          />
          <SectionTab
            icon={<BsUpload></BsUpload>}
            title="Planning Data"
            active={tab === "planning"}
            onClick={() => setTab("planning")}
          />
           <SectionTab
            icon={<BsUpload></BsUpload>}
            title="Variable Cost"
            active={tab === "variable"}
            onClick={() => setTab("variable")}
          />
        </div>

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  {tab === "database" && <DatabaseFeeds />}
                  {tab === "feedstock" && <FeedstockQuality />}
                  {tab === "raw" && <RawMaterialPricing />}
                  {tab === "planning" && <PlanningData />}
                    {tab === "variable" && <VariableCost />}

                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Inputs;
