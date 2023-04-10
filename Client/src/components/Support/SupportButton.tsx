import { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import NewAgentForm from "./Forms/NewAgentForm";
import NewTicketForm from "./Forms/NewTicketForm";
import NewTeamForm from "./Forms/NewTeamForm";
import NewIssurTypeForm from "./Forms/NewIssueTypeForm";

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
  const handleNewAgent = () => {
    setModalTitle("New Agent");
    setModalBody(<NewAgentForm />);
    setshow(true);
  };
  const handleNewTeam = () => {
    setModalTitle("New Team");
    setModalBody(<NewTeamForm />);
    setshow(true);
  };
  const handleNewIssueType = () => {
    setModalTitle("New Issue Type");
    setModalBody(<NewIssurTypeForm />);
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
            <button  onClick={handleNewIssueType} type="button" className="btn btn-outline-primary"
              style={{
                border: "1px solid #482890",
                color: "#482890",
              }}
            >
              + New Issue
            </button>
          </div>
          <div className="col-3" style={{ padding: "0 0 0 40px" }}>
            <button onClick={ handleNewTeam} type="button" className="btn btn-outline-primary"
              style={{
                border: "1px solid #482890",
                color: "#482890",
              }}
            >
              + New Team
            </button>
          </div>
          <div className="col-2" style={{ padding: "0" }}>
            <button onClick={handleNewTicket}  type="button"  className="btn btn-outline-light"
              style={{ backgroundColor: "#FF615A" }}
            >
              + New Ticket
            </button>
          </div>
          <div className="col-2" style={{ padding: "0" }}>
            <button  onClick={handleNewAgent}  type="button"  className="btn btn-outline-light"
              style={{ backgroundColor: "#482890" }}
            >
              + New Agent
            </button>
          </div>
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#FF615A" }}>
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
