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
interface IssueType {
  id: number;
  name: string;
}
interface employeeType {
  id: number;
  firstName: string;
}
interface EditTicketFormProps {
  showModal: boolean;
  selectedTicket: ticketType | null;
  agents: agentType[];
  issueTypes: IssueType[];
  employees: employeeType[];
  handleModalClose: () => void;  
  setSelectedTicket: React.Dispatch<React.SetStateAction<ticketType | null>>;
}

const ViewTicketForm: React.FC<EditTicketFormProps> = ({
  showModal,
  selectedTicket,
  agents,
  issueTypes,
  employees,
  handleModalClose,  
  setSelectedTicket,
}) => {
  const getIssueTypeName = (issueTypeId: number) => {
    const issueType = issueTypes.find((type) => type.id === issueTypeId);
    return issueType ? issueType.name : "N/A";
  };
  const getAgentName = (agentId: number) => {
    const agent = agents.find((type) => type.id === agentId);
    return agent? agent.firstName : "N/A";
  };
  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find((type) => type.id === employeeId);
    return employee? employee.firstName : "N/A";
  };
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      {selectedTicket && (
        <>
          <Modal.Header style={{ backgroundColor: "#482890" }}>
            <Modal.Title style={{ color: "white" }}>
              Ticket Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="ticket-details-container">
              
              <div className="ticket-detail">
                <span>Ticket ID:</span>
                {selectedTicket.id}
              </div><br/>
              <div className="ticket-detail">
                <span>Employee:</span>
                {getEmployeeName(selectedTicket.employeeId)}
              </div><br/>
              <div className="ticket-detail">
                <span>Issue Type:</span>
                {getIssueTypeName(selectedTicket.issueTypeId)}
              </div><br/>
              <div className="ticket-detail">
                <span>Problem:</span>
                {selectedTicket.problem}
              </div><br/>
              <div className="ticket-detail">
                <span>Submit Date:</span>
                {selectedTicket.submitDate}
              </div><br/>
              <div className="ticket-detail">
                <span>Assign Agent:</span>
                {getAgentName(selectedTicket.agentId)}
              </div>
            </div>

           
          </Modal.Body>
          <Modal.Footer>
            
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ViewTicketForm;
