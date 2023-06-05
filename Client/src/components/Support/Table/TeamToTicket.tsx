import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Badge, Button, Table, Modal } from "react-bootstrap";
import axios from "axios";

interface Ticket {
  id: number;
  problem: string;
  agentId: number;
  ticketStatus: string;
  teamId: number;
  teamName: string;
}

interface Props {
  teamId: number;
}

const TeamToTicket: React.FC<Props> = ({ teamId }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [showModal, setShowModal] = useState<boolean>(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [assignedAgentId, setAssignedAgentId] = useState<number | null>(null);

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
    window.location.reload(); // Refresh the page
  };

  const handleAssignClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedTicket(null);
    setShowModal(false);
    setAssignedAgentId(null);
  };

  const handleUpdateTicket = async () => {
    if (selectedTicket && assignedAgentId !== null) {
      try {
        await axios.put(
          `http://localhost:5087/Api/Ticket/${selectedTicket.id}`,
          {
            agentId: assignedAgentId,
            ticketStatus: "Pending",
          }
        );
        // Refresh tickets after successful update
        const response = await axios.get(
          `http://localhost:5087/Api/Ticket/team/${teamId}`
        );
        setTickets(response.data);
        handleModalClose();
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <div>
      <div className="row">
        <div className="col-10">
          <p className="table-heading">{getTeamName(teamId)}</p>
        </div>
        <div className="col-1">
          <Button onClick={handleBackClick}>Back</Button>
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
                  <th>Assign Agent</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td></td>
                    <td>{ticket.problem}</td>
                    <td>{getAgentName(ticket.agentId)}</td>
                    <td>
                      {ticket.ticketStatus === "Opened" ? (
                        <Badge className={"bg-info"}>Opened</Badge>
                      ) : ticket.ticketStatus === "Solved" ? (
                        <Badge className={"bg-success"}>Solved</Badge>
                      ) : ticket.ticketStatus === "Pending" ? (
                        <Badge className={"bg-warning"}>Pending</Badge>
                      ) : (
                        <Badge className={"bg-danger"}>Not Assign</Badge>
                      )}
                    </td>
                    <td>
                      {ticket.ticketStatus === "Not Assign" ? (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                          onClick={() => handleAssignClick(ticket)}
                        >
                          Assign
                        </button>
                      ) : (
                        <button
                          type="button"
                          className="btn btn-secondary btn-sm"
                        >
                          Reply
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>

      {/* Assign Ticket Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <label htmlFor="agent">Assign Agent:</label>
            <select
              className="form-select"
              id="agent"
              onChange={(e) => setAssignedAgentId(Number(e.target.value))}
            >
              <option value="">Select an Agent</option>
              {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                  {agent.firstName}
                </option>
              ))}
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
    </div>
  );
};

export default TeamToTicket;
