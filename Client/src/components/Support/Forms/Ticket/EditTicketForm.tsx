import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../../../css/Support/Support.css";

interface ticketType {
  id: number;
  employeeId: number;
  email: string;
  issueTypeId: number;
  problem: string;
  submitDate: string;
  agentId: number;
  ticketStatus: string;
}

interface agentType {
  id: number;
  firstName: string;
}

interface EditTicketFormProps {
  showModal: boolean;
  selectedTicket: ticketType | null;
  agents: agentType[];
  handleModalClose: () => void;
  handleUpdateTicket: () => void;
  setSelectedTicket: React.Dispatch<React.SetStateAction<ticketType | null>>;
}

const EditTicketForm: React.FC<EditTicketFormProps> = ({
  showModal,
  selectedTicket,
  agents,
  handleModalClose,
  handleUpdateTicket,
  setSelectedTicket,
}) => {
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      {selectedTicket && (
        <>
          <Modal.Header style={{ backgroundColor: "#482890" }}>
            <Modal.Title style={{ color: "white" }}>
              Assign Ticket To Agent
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ticket-details-container">
              <h4>Ticket Details</h4>
              <div className="ticket-detail">
                <span>Ticket ID:</span>
                {selectedTicket.id}
              </div>
              <div className="ticket-detail">
                <span>Employee ID:</span>
                {selectedTicket.employeeId}
              </div>
              <div className="ticket-detail">
                <span>Issue Type ID:</span>
                {selectedTicket.issueTypeId}
              </div>
              <div className="ticket-detail">
                <span>Problem:</span>
                {selectedTicket.problem}
              </div>
              <div className="ticket-detail">
                <span>Submit Date:</span>
                {selectedTicket.submitDate}
              </div>
            </div>

            <Form>
              <Form.Group>
                <Form.Label>Assign Agent</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="agentId"
                  value={selectedTicket.agentId}
                  onChange={(e) =>
                    setSelectedTicket({
                      ...selectedTicket,
                      agentId: Number(e.target.value),
                    })
                  }
                >
                  <option value="">Select Agent</option>
                  {agents.map((agent) => (
                    <option key={agent.id} value={agent.id}>
                      {agent.firstName}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="ticketStatus"
                  value={selectedTicket.ticketStatus}
                  onChange={(e) =>
                    setSelectedTicket({
                      ...selectedTicket,
                      ticketStatus: e.target.value,
                    })
                  }
                >
                  <option value="Opened">Opened</option>
                  <option value="Solved">Solved</option>
                  <option value="Pending">Pending</option>                  
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdateTicket}>Assign</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default EditTicketForm;
