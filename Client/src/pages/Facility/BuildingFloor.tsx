import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BuildingFloor_table from "../../components/Facility/BuildingFloor_table";
import "./../../css/Table.css";


import Navbar from "../../components/Navbar";

import Facbutton from "../../components/Facility/Facbutton";
import "../../css/Facilitycss/Topbutton.css";

const BuildingFloor: React.FC = () => {
  return (
    <div>
      <Container>
        <Row>
          <Col><h2 className="table-page-heading">BUILDING</h2></Col>          
          <Col md={3}><Facbutton /></Col>
        </Row>
        <div>
          <BuildingFloor_table />
        </div>
      </Container>
    </div>
  );
};

export default BuildingFloor;
