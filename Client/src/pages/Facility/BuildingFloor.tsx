import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import BuildingFloor_table from "../../components/Facility/BuildingFloor_table";

import Navbar from "../../components/Navbar";

import Facbutton from "../../components/Facility/Facbutton";
import "../../css/Facilitycss/Topbutton.css";

const BuildingFloor: React.FC = () => {
  return (
    <div>
      <Facbutton />
      <h5
        style={{
          color: "purple",
          marginLeft: 120,
          paddingTop: 40,
          fontWeight: "bold",
        }}
      >
        Building & Spaces
      </h5>
      <div className="">
        <BuildingFloor_table/>
      </div>
    </div>
  );
};

export default BuildingFloor;
