import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Badge, Button, Table } from "react-bootstrap";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons";




interface Ticket {
  id: number;
  problem: string;
  agentId:number;
  ticketStatus: string;
  // Add other properties of the ticket object as needed
}

interface Props {
  teamId: number;
}

const TeamToTicket: React.FC<Props> = ({ teamId }) => {
const [tickets, setTickets] = useState<Ticket[]>([]);
const [agents, setAgents] = useState<any[]>([]);


  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:5087/Api/Ticket/team/${teamId}`);
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
    fetchAgents();
  }, []);

  const getAgentName = (agentId: number) => {
    const agent = agents.find((agent) => agent.id === agentId);
    return agent ? agent.firstName : "N/A";
  };

  const handleBackClick = () => {    
    window.location.reload(); // Refresh the page
  };


  return (
    <div>
      <div className="row">
        <div className="col-8">
          <p className="table-heading">Team Name</p>
        </div>
        <div className="col-1"><Button onClick={handleBackClick}>Back</Button></div>
      </div>

      <div className="box-shadow">
        <Fragment>
          <div>
            <Table className="support-table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th style={{ width: "60px" }}></th>
                  <th>Ticket ID</th>
                  <th>Problem</th>
                  <th>Assign Agent</th>
                  <th>Status</th>
                  <th>Reply</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td></td>
                    <td>{ticket.id}</td>
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
                    <td><FontAwesomeIcon
                          icon={faPen}
                          style={{
                            color: "#482890",
                            cursor: "pointer",
                          }}
                         
                        /></td>          
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default TeamToTicket;
