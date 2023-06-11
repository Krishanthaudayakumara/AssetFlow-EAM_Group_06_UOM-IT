import { Fragment, useEffect, useState } from "react";
import { Badge, Table, Form, InputGroup } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../css/Support/Support.css";
import DefaultProfilePicture from "../DefaultProfilePicture";
import ViewTicketForm from "../Forms/Ticket/ViewTicketForm";
import DeleteConfirmation from "../ConfirmMessages/DeleteConfirmation";
import { FaSearch } from "react-icons/fa";
import PaginationComponent from "../pagination";

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
  const [issueTypes, setIssueTypes] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTicket, setDeletingTicket] = useState<TicketType | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  const recordsPerPage = 4;

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
    const fetchEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5087/Api/Employee");
        setEmployees(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);
  useEffect(() => {
    const fetchIssueTypes = async () => {
      try {
        const response = await axios.get("http://localhost:5087/Api/IssueType");
        setIssueTypes(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchIssueTypes();
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
  const getIssueTypeName = (issueTypeId: number) => {
    const issueType = issueTypes.find(
      (issueType) => issueType.id === issueTypeId
    );
    return issueType ? issueType.name : "N/A";
  };

  const handleDeleteTicket = (ticket: TicketType) => {
    setDeletingTicket(ticket);
    setShowDeleteModal(true);
  };

  const confirmDeleteTicket = () => {
    axios
      .delete(`http://localhost:5087/Api/Ticket/${deletingTicket?.id}`)
      .then((response) => {
        setTickets(tickets.filter((item) => item.id !== deletingTicket?.id));
      })
      .catch((error) => {
        // Handle errors
      })
      .finally(() => {
        setDeletingTicket(null);
        setShowDeleteModal(false);
      });
  };

  const totalPages = Math.ceil(tickets.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div>
      <div className="row">
        <div className="col-8">          
        </div>
        <div className="col-1">
          <Form>
            <InputGroup style={{ width: "300px" }}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Ticket by problem"
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
                  <th>Submit Date</th>
                  <th>Assign Agent</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets
                  .filter((ticket) => {
                    return search.toLowerCase() === ""
                      ? ticket
                      : ticket.problem.toLowerCase().includes(search);
                  })
                  .slice(
                    (currentPage - 1) * recordsPerPage,
                    currentPage * recordsPerPage
                  )
                  .map((ticket) => (
                    <tr key={ticket.id}>
                      <td>{DefaultProfilePicture({ name: ticket.problem })}</td>
                      <td>{ticket.problem.length > 10 ? ticket.problem.slice(0, 20) + '...' : ticket.problem}</td>
                      <td>{ticket.submitDate.split('T')[0]}</td>
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
                          icon={faEye}
                          style={{
                            color: "#482890",
                            cursor: "pointer",
                          }}
                          title="View Ticket"
                          onClick={() => handleEditTicketClick(ticket)}
                        />
                        &nbsp; &nbsp; &nbsp;
                        <FontAwesomeIcon
                          icon={faTrash}
                          style={{
                            color: "#FF615A",
                            cursor: "pointer",
                          }}
                          title="Delete Ticket"
                          onClick={() => handleDeleteTicket(ticket)}
                        />
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </div>
          {showEditModal && (
            <ViewTicketForm
              showModal={showEditModal}
              selectedTicket={selectedTicket}
              agents={agents}
              issueTypes={issueTypes}
              employees={employees}
              handleModalClose={() => setShowEditModal(false)}
              setSelectedTicket={setSelectedTicket}
            />
          )}
          <DeleteConfirmation
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDeleteTicket}
            deletingIssueName={deletingTicket?.problem || ""}
          />
        </Fragment>
      </div>
      <div className="pagination-wrapper">
        <PaginationComponent
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default TicketTable;
