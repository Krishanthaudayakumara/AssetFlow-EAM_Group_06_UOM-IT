import { Fragment, useEffect, useState } from "react";
import { Badge, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../css/Support/Support.css";
import DefaultProfilePicture from "../DefaultProfilePicture";
import EditTicketForm from "../Forms/Ticket/EditTicketForm";
import DeleteConfirmation from "../ConfirmMessages/DeleteConfirmation";

interface TicketType {
  id: number;
  employeeId: number;
  email: string;
  issueTypeId: number;
  problem: string;
  submitDate: string;
  agentId: number;
  ticketStatus: string;
}

const TicketTable = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);

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

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get("http://localhost:5087/Api/Ticket");
        setTickets(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchTickets();
  }, []);

  const getAgentName = (agentId: number) => {
    const agent = agents.find((agent) => agent.id === agentId);
    return agent ? agent.firstName : "N/A";
  };

  const handleEditTicketClick = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setShowEditModal(true);
  };

  const handleDeleteTicket = (ticket: TicketType) => {
    setSelectedTicket(ticket);
    setShowDeleteModal(true);
  };

  const confirmDeleteTicket = () => {
    if (selectedTicket) {
      axios
        .delete(`http://localhost:5087/Api/Ticket/${selectedTicket.id}`)
        .then((response) => {
          setTickets(tickets.filter((item) => item.id !== selectedTicket.id));
          setShowDeleteModal(false);
          setSelectedTicket(null);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  return (
    <div>
      <p className="table-heading">Support Tickets</p>
      <div className="box-shadow">
        <Fragment>
          <div>
            <Table className="support-table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th style={{ width: "60px" }}></th>
                  <th>Problem</th>
                  <th>Submit Date & Time</th>
                  <th>Assign Agent</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{DefaultProfilePicture({ name: ticket.problem })}</td>
                    <td>{ticket.problem}</td>
                    <td>{ticket.submitDate}</td>
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
                        <FontAwesomeIcon
                          icon={faPen}
                          style={{
                            color: "#482890",
                            cursor: "pointer",
                          }}
                          onClick={() => handleEditTicketClick(ticket)}
                        />
                        &nbsp; &nbsp; &nbsp;
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{
                            color: "#FF615A",
                            cursor: "pointer",
                          }}
                          onClick={() => handleDeleteTicket(ticket)}
                        />
                      </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
          {showEditModal && (
            <EditTicketForm
              showModal={showEditModal}
              selectedTicket={selectedTicket}
              agents={agents}
              handleModalClose={() => setShowEditModal(false)}
              handleUpdateTicket={() => {
                // Logic to update the ticket
              }}
              setSelectedTicket={setSelectedTicket}
            />
          )}
          
        </Fragment>
      </div>
    </div>
  );
};

export default TicketTable;

