import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../../../css/Support/Support.css";
import axios from "axios";

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

interface ReplyType {
  id: number;
  text: string;
  replyDate: string;
  ticketId: number;
}

interface FeedbackType{
  id: number;
  rating: string;
  comment: string;
  createDate: string;
  ticketId: number;
}

interface ViewTicketFormProps {
  showModal: boolean;
  selectedTicket: ticketType | null;
  agents: agentType[];
  issueTypes: IssueType[];
  employees: employeeType[];
  handleModalClose: () => void;
  setSelectedTicket: React.Dispatch<React.SetStateAction<ticketType | null>>;
}

const ViewTicketForm: React.FC<ViewTicketFormProps> = ({
  showModal,
  selectedTicket,
  agents,
  issueTypes,
  employees,
  handleModalClose,
  setSelectedTicket,
}) => {
  const [reply, setReply] = useState<ReplyType | null>(null);
  const [feedback, setFeedback] = useState<FeedbackType | null>(null);

  useEffect(() => {
    const fetchReply = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5087/Api/Ticket/api/tickets/${selectedTicket?.id}/reply`
        );
        setReply(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedTicket) {
      fetchReply();
    }
  }, [selectedTicket]);

  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5087/Api/Feedback/api/tickets/${selectedTicket?.id}/feedback`
        );
        setFeedback(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (selectedTicket) {
      fetchFeedback();
    }
  }, [selectedTicket]);

  const getIssueTypeName = (issueTypeId: number) => {
    const issueType = issueTypes.find((type) => type.id === issueTypeId);
    return issueType ? issueType.name : "N/A";
  };

  const getAgentName = (agentId: number) => {
    const agent = agents.find((type) => type.id === agentId);
    return agent ? agent.firstName : "N/A";
  };

  const getEmployeeName = (employeeId: number) => {
    const employee = employees.find((type) => type.id === employeeId);
    return employee ? employee.firstName : "N/A";
  };

  return (
    <Modal show={showModal} onHide={handleModalClose}>
      {selectedTicket && (
        <>
          <Modal.Header style={{ backgroundColor: "#482890" }} closeButton>
            <Modal.Title style={{ color: "white" }}>
              Ticket Details
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="details-container">
              <div className="detail">
                <span>Ticket ID:</span>
                {selectedTicket.id}
              </div>
              <br />
              <div className="detail">
                <span>Employee:</span>
                {getEmployeeName(selectedTicket.employeeId)}
              </div>
              <br />
              <div className="detail">
                <span>Issue Type:</span>
                {getIssueTypeName(selectedTicket.issueTypeId)}
              </div>
              <br />
              <div className="detail">
                <span>Problem:</span>
                {selectedTicket.problem}
              </div>
              <br />
              <div className="detail">
                <span>Submit Date:</span>
                {selectedTicket.submitDate}
              </div>
              <br />
              <div className="detail">
                <span>Assign Agent:</span>
                {getAgentName(selectedTicket.agentId)}
              </div><br/>
              <div className="detail">
                <span>Reply:</span>
                {reply?.text || "N/A"}
              </div><br/>
              <div className="detail">
                <span>Reply Date:</span>
                {reply?.replyDate || "N/A"}
              </div><br/>
              <div className="detail">
                <span>Rate:</span>
                {feedback?.rating || "N/A"}
              </div><br/>
              <div className="detail">
                <span>Comment:</span>
                {feedback?.comment || "N/A"}
              </div><br/>
              <div className="detail">
                <span>Create Date:</span>
                {feedback?.createDate || "N/A"}
              </div><br/>
            </div>
          </Modal.Body>
          <Modal.Footer></Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default ViewTicketForm;

