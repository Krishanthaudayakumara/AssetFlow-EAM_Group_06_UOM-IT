import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import AgentTable from "../../components/Support/Table/AgentTable";
import NewAgentForm from "../../components/Support/Forms/Agent/NewAgentForm";

const Agents: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <p className="page-heading">SUPPORT AGENTS</p>
        </div>
        <div className="col-3" style={{ padding: "0 0 0 70px" }}>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleShow}
            style={{ backgroundColor: "#FF615A" }}
          >
            + Add New Agent
          </button>
        </div>
      </div>
      <hr style={{ margin: "0 0 0 300px", color: "blue" }} />
      <div className="row">
        <div>
          <br />
          <AgentTable />
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>New Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewAgentForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Agents;
