
import React from "react";
import Table from "react-bootstrap/Table";
import "../../css/Facilitycss/workstationcard.css"; // import background image CSS file
import { FaMouse } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaStar } from "react-icons/fa";

<div className=""></div>
 type workstationprop = {
  workstationName: string;
};

export default function WorkstationCard(props: workstationprop) {
  return (
    <div className="col-4 card-container">
      <div className="ws-card">
        <h6 className="workstation"> {props.workstationName} </h6>
        
      </div>
    </div>
  );
}
