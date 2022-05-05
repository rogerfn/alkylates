import React from "react";
import { Card } from "react-bootstrap";
import { Form } from "react-bootstrap";
import Select from "react-select";
import VariableCostGraph from "./VariableCostGraph";
import HomologBalance from "./HomologBalance";
const Home = () => {
  return (
    <div className="container">
      <div className="row mt-5">
        <div className="col-md-12">
          <h2>Commodities Filtering</h2>
          <Card>
            <Card.Body>
             
                <div className="d-flex flex-row ">
                  <div className="p-2">
                    <Form.Label style={{ fontSize: "1rem" }}>
                      Product
                    </Form.Label>
                    <Select
                      options={[
                        { value: "1", label: "Option 1" },
                        { value: "2", label: "Option 2" },
                        { value: "3", label: "Option 3" },
                        { value: "4", label: "Option 4" },
                        { value: "5", label: "Option 5" },
                        { value: "6", label: "Option 6" },
                      ]}
                      isMulti
                      placeholder="Select Product"
                      className="basic-multi-select"
                      classNamePrefix="select"
                    />
                  </div>
                  <div className="p-2">
                    <Form.Label  style={{ fontSize: "1rem" }}>Date</Form.Label>
                    <Form.Control type="date" placeholder="Enter date" />
                  </div>
                </div>
              
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={{ padding: "1rem" }}>
          <h5>Variable Cost</h5>
          <Card style={{ height: "320px", padding:'1rem' }}>
            <Card.Body>
              <VariableCostGraph />
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6" style={{ padding: "1rem" }}>
          <h5>LAB Variable Cost</h5>
          <Card style={{ height: "320px", padding:'1rem' }}>
            <Card.Body>
              <VariableCostGraph />
            </Card.Body>
          </Card>
        </div>
      </div>

      <div className="row">
        <div className="col-md-6" style={{ padding: "1rem" }}>
          <h5>LAB Netback Cost</h5>
          <Card style={{ height: "320px", padding:'1rem' }}>
            <Card.Body>
              <VariableCostGraph />
            </Card.Body>
          </Card>
        </div>

        <div className="col-md-6" style={{ padding: "1rem" }}>
          <h5>Homolog Balance</h5>
          <Card style={{ height: "320px", padding:'1rem' }}>
            <Card.Body>
              <HomologBalance />
            </Card.Body>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Home;
