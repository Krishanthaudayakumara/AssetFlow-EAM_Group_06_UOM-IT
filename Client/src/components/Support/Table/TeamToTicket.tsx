import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Badge, Button, Table, Modal, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faComment,
  faEnvelope,
  faUser,
} from "@fortawesome/free-solid-svg-icons";
import DefaultProfilePicture from "../DefaultProfilePicture";
import "../../../css/Support/Support.css";
import { Alert } from "react-bootstrap";
import { FaSearch } from "react-icons/fa";
import TeamTable from "./TeamTable";

interface Ticket {
  id: number;
  problem: string;
  email: string;
  agentId: number;
  ticketStatus: string;
  teamId: number;
  teamName: string;
}

interface Props {
  teamId: number;
}
interface ReplyToInsert {
  TicketId: number;
  Text: string;
}

const TeamToTicket: React.FC<Props> = ({ teamId }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [assignedAgentId, setAssignedAgentId] = useState<number | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<string>("");
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [replyText, setReplyText] = useState<string>("");
  const [showReplyModal, setShowReplyModal] = useState<boolean>(false);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [showTeamTable, setShowTeamTable] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5087/Api/Ticket/team/${teamId}`
        );
        setTickets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (teamId) {
      fetchTickets();
    }
  }, [teamId]);

  useEffect(() => {
    const fetchAgents = async () => {
      try {
        const response = await axios.get("http://localhost:5087/Api/Agent");
        setAgents(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    const fetchTeams = async () => {
      try {
        const response = await axios.get("http://localhost:5087/Api/Team");
        setTeams(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    fetchAgents();
    fetchTeams();
  }, []);

  const getAgentName = (agentId: number) => {
    const agent = agents.find((agent) => agent.id === agentId);
    return agent ? agent.firstName : "N/A";
  };

  const getTeamName = (teamId: number) => {
    const team = teams.find((team) => team.id === teamId);
    return team ? team.name : "N/A";
  };

  const handleBackClick = () => {
    
    setShowTeamTable(true);
  };

  const handleAssignClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setAssignedAgentId(ticket.agentId); // Set the assigned agent ID
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedTicket(null);
    setShowModal(false);
    setAssignedAgentId(null);
  };

  const handleUpdateTicket = async () => {
    if (selectedTicket && assignedAgentId !== null && selectedStatus) {
      try {
        await axios.put(
          `http://localhost:5087/Api/Ticket/${selectedTicket.id}`,
          {
            agentId: assignedAgentId,
            ticketStatus: selectedStatus,
          }
        );
        // Refresh tickets after successful update
        const response = await axios.get(
          `http://localhost:5087/Api/Ticket/team/${teamId}`
        );
        setTickets(response.data);
        handleModalClose();
        setShowAlert(true);
      } catch (error) {
        console.log(error);
        setShowErrorAlert(true);
      }
    }
  };

  const handleReplySubmit = async () => {
    if (!selectedTicketId || !replyText) {
      return;
    }

    const replyToInsert: ReplyToInsert = {
      TicketId: selectedTicketId,
      Text: replyText,
    };

    try {
      const response = await axios.post(
        "http://localhost:5087/Api/Reply",
        replyToInsert
      );
      console.log(response.data);
      setShowAlert(true);
      // Handle the successful reply submission as desired
    } catch (error) {
      console.log(error);
      setShowErrorAlert(true);
      // Handle the error case
    }

    setSelectedTicketId(null);
    setReplyText("");
    setShowReplyModal(false);
  };

  const handleCloseModal = () => {
    setSelectedTicketId(null);
    setReplyText("");
    setShowReplyModal(false);
  };

  return (
    <div>
      {/* Success Alert */}
      {showAlert && (
        <Alert
          variant="success"
          onClose={() => setShowAlert(false)}
          dismissible
          style={{ marginLeft: "100px", marginRight: "100px" }}
        >
          <div style={{ textAlign: "center" }}>Successfully !!!</div>
        </Alert>
      )}
      {showErrorAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowErrorAlert(false)}
          dismissible
          style={{ marginLeft: "100px", marginRight: "100px" }}
        >
          <div style={{ textAlign: "center" }}>Already Submit Reply !!!</div>
        </Alert>
      )}

      {showTeamTable ? (
        <TeamTable /> // Replace TeamTable with the component for rendering the team table
      ) : (
        <div>
          <div className="row">
            <div className="col-6">
              <p className="table-heading">{getTeamName(teamId)}</p>
            </div>
            <div className="col-1">
              <Button onClick={handleBackClick}>Back</Button>
            </div>
            <div className="col-1">
              <Form>
                <InputGroup style={{ width: "300px" }}>
                  <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Enter Agent Name"
                  />
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </div>
          </div>
          <div className="box-shadow">
            <Fragment>
              <div>
                <Table className="support-table">
                  <thead>
                    <tr style={{ color: "#482890" }}>
                      <th style={{ width: "60px" }}></th>
                      <th>Problem</th>
                      <th>Submit By</th>
                      <th>Assign Agent</th>
                      <th>Status</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets
                      .filter((ticket) => {
                        const agentName = getAgentName(ticket.agentId);
                        return (
                          search.toLowerCase() === "" ||
                          agentName.toLowerCase().includes(search)
                        );
                      })
                      .map((ticket) => (
                        <tr key={ticket.id}>
                          <td>
                            {DefaultProfilePicture({ name: ticket.problem })}
                          </td>
                          <td>{ticket.problem}</td>
                          <td>{ticket.email}</td>
                          <td>{getAgentName(ticket.agentId)}</td>
                          <td>
                            {ticket.ticketStatus ? (
                              ticket.ticketStatus === "Opened" ? (
                                <Badge className={"bg-info"}>Opened</Badge>
                              ) : ticket.ticketStatus === "Solved" ? (
                                <Badge className={"bg-success"}>Solved</Badge>
                              ) : ticket.ticketStatus === "Pending" ? (
                                <Badge className={"bg-warning"}>Pending</Badge>
                              ) : ticket.ticketStatus === "Not Assign" ? (
                                <Badge className={"bg-danger"}>
                                  Not Assign
                                </Badge>
                              ) : null
                            ) : null}
                          </td>

                          <td>
                            {ticket.ticketStatus === "Not Assign" ? (
                              <FontAwesomeIcon
                                icon={faUser}
                                style={{ color: "#482890", cursor: "pointer" }}
                                title="Assign Agent To Ticket"
                                onClick={() => handleAssignClick(ticket)}
                              />
                            ) : ticket.ticketStatus === "Opened" ||
                              ticket.ticketStatus === "Pending" ? (
                              <>
                                <FontAwesomeIcon
                                  icon={faUser}
                                  style={{
                                    color: "#482890",
                                    cursor: "pointer",
                                  }}
                                  title="Assign Agent To Ticket"
                                  onClick={() => handleAssignClick(ticket)}
                                />
                                &nbsp; &nbsp; &nbsp;
                                <FontAwesomeIcon
                                  icon={faComment}
                                  style={{
                                    color: "#FF615A",
                                    cursor: "pointer",
                                  }}
                                  title="Reply To Ticket"
                                  onClick={() => {
                                    setSelectedTicketId(ticket.id);
                                    setShowReplyModal(true);
                                  }}
                                />
                              </>
                            ) : ticket.ticketStatus === "Solved" ? (
                              <FontAwesomeIcon
                                icon={faEnvelope}
                                style={{ color: "#FF615A", cursor: "pointer" }}
                                title="Edit the Reply"
                              />
                            ) : null}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </Table>
              </div>
            </Fragment>
          </div>
        </div>
      )}

      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>Assign To Agent</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="agent">Assign Agent Name:</label>
            <select
              className="form-select"
              id="agent"
              required
              onChange={(e) => setAssignedAgentId(Number(e.target.value))}
              value={assignedAgentId || ""}
            >
              <option value="">Select an Agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.firstName}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="status">Ticket Status:</label>
            <select
              className="form-select"
              id="status"
              required
              onChange={(e) => setSelectedStatus(e.target.value)}
              value={selectedStatus}
            >
              <option value="">Select a Status</option>
              <option value="Opened" selected={selectedStatus === "Opened"}>
                Opened
              </option>
              <option value="Solved" selected={selectedStatus === "Solved"}>
                Solved
              </option>
              <option value="Pending" selected={selectedStatus === "Pending"}>
                Pending
              </option>
              <option
                value="Not Assign"
                selected={selectedStatus === "Not Assign"}
              >
                Not Assign
              </option>
            </select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdateTicket}>
            Assign
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showReplyModal} onHide={handleCloseModal}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>Reply to Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="replyText">
              <div className="details-container">
                <div className="detail">
                  <span>Problem : </span>

                  {
                    tickets.find((ticket) => ticket.id === selectedTicketId)
                      ?.problem
                  }
                </div>
              </div>
            </Form.Group>
            <Form.Group controlId="replyInput">
              <Form.Label>Your Reply</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleReplySubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default TeamToTicket;
