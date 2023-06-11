import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Badge, Button, Table, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import DefaultProfilePicture from "../DefaultProfilePicture";
import "../../../css/Support/Support.css";
import { FaSearch } from "react-icons/fa";
import AgentTable from "./AgentTable";

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
  agentId: number;
}

const AgentToTicket: React.FC<Props> = ({ agentId }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [showAgentTable, setShowAgentTable] = useState(false);
  const [agents, setAgents] = useState<any[]>([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5087/Api/Ticket/api/agents/${agentId}/ticket`
        );
        setTickets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (agentId) {
      fetchTickets();
    }
  }, [agentId]);
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
    return agent ? `${agent.firstName} ${agent.lastName}` : "N/A";
  };

  const handleBackClick = () => {
    setShowAgentTable(true);
  };
  return (
    <div>
      {showAgentTable ? (
        <AgentTable /> // Replace TeamTable with the component for rendering the team table
      ) : (
        <div>
          <div className="row">
            <div className="col-6">
              <p className="table-heading">{getAgentName(agentId)}</p>
            </div>
            <div className="col-1">
              <Button onClick={handleBackClick}>Back</Button>
            </div>
            <div className="col-1">
              <Form>
                <InputGroup style={{ width: "300px" }}>
                  <Form.Control onChange={(e) => setSearch(e.target.value)} placeholder="Enter Ticket Status" />
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
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {tickets
                    .filter((ticket) => {
                        const agentName = ticket.ticketStatus;
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
                        <td>
                          {ticket.ticketStatus ? (
                            ticket.ticketStatus === "Opened" ? (
                              <Badge className={"bg-info"}>Opened</Badge>
                            ) : ticket.ticketStatus === "Solved" ? (
                              <Badge className={"bg-success"}>Solved</Badge>
                            ) : ticket.ticketStatus === "Pending" ? (
                              <Badge className={"bg-warning"}>Pending</Badge>
                            ) : ticket.ticketStatus === "Not Assign" ? (
                              <Badge className={"bg-danger"}>Not Assign</Badge>
                            ) : null
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
    </div>
  );
};
export default AgentToTicket;
