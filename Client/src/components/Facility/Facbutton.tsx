import React from "react";
import { Button, Modal } from "react-bootstrap";
import "../../css/Facilitycss/Topbutton.css";
import { useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import Forms from "./Forms";
import axios from "axios";

const Facbutton: React.FC = () => {
  const [show, setshow] = useState(false);
  const handleClose = () => setshow(false);
  const handleShow = () => {
    setshow(true);
  };
  return (
    <div>
      <Button className="btn btn-outline-light" style={{ backgroundColor: "#FF615A" }} onClick={handleShow} data-toggle="modal">
        + New Building
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>Add building</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Forms />
        </Modal.Body>
        <Modal.Footer>
          <Button className="close-btn" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};
export default Facbutton;
