import React, { useState } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Facilitycss/workstationcard.css"; // import background image CSS file
import { FaMouse } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";

import AssignAssetForm from "./AssignAssetForm";
import Workstation from "./Workstationdata";

type WorkstationProp = {
  workstationName: string;
  id:number;


};

export default function WorkstationCard(props: WorkstationProp) {
  const [showModal, setShowModal] = useState(false);

  const handleButtonClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="col-4 card-container">
      <div className="ws-card">
        <h6 className="workstation"> {props.workstationName} </h6>
        <Button onClick={handleButtonClick}>Click</Button>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Assets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <AssignAssetForm  id={props.id}/>

          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}
