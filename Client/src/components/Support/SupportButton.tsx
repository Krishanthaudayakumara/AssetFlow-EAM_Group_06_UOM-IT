import React, { useState } from "react";
import { Button, Modal, ModalTitle } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import AddAgentModalForm from "./Forms/AddAgentModalForm";
import NewTicketForm from "./Forms/NewTicketForm";

export default function SupportButton() {
  const [show, setshow] = useState(false);
  const [modalTitle, setModalTitle] = useState("New Ticket");
  const [modalBody, setModalBody] = useState(<NewTicketForm />);
  const handleClose = () => setshow(false);
  const handleNewTicket = () => {
    setModalTitle("New Ticket");
    setModalBody(<NewTicketForm />);
    setshow(true);
  };
  const handleAddAgent = () => {
    setModalTitle("Add Agent");
    setModalBody(<AddAgentModalForm />);
    setshow(true);
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-2">
            <p
              style={{
                margin: "0 0 0 60px",
                color: "#482890",
                fontSize: "22px",
                fontWeight: "bold",
              }}
            >
              SUPPORT
            </p>
          </div>
          <div className="col-3" style={{ padding: "0 0 0 120px" }}>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{
                border: "1px solid #482890",
                color: "#482890",
              }}
            >
              + New Issue
            </button>
          </div>
          <div className="col-3" style={{ padding: "0 0 0 40px" }}>
            <button
              type="button"
              className="btn btn-outline-primary"
              style={{
                border: "1px solid #482890",
                color: "#482890",
              }}
            >
              + New Team
            </button>
          </div>
          <div className="col-2" style={{ padding: "0" }}>
            <button
              onClick={handleNewTicket}
              type="button"
              className="btn btn-outline-light"
              style={{ backgroundColor: "#FF615A" }}
            >
              + New Ticket
            </button>
          </div>
          <div className="col-2" style={{ padding: "0" }}>
            <button
              onClick={handleAddAgent}
              type="button"
              className="btn btn-outline-light"
              style={{ backgroundColor: "#482890" }}
            >
              + New Agent
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
