import { Fragment, useEffect, useState } from "react";
import {
  Badge,
  Table,
  Form,
  InputGroup,
  Modal,
  Alert,
  Button,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faStar, faTrash } from "@fortawesome/free-solid-svg-icons";
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

interface FeedbackToInsert {
  rating: string;
  comment: string;
  ticketId: number;
}

const MyTicketTable = () => {
  const [tickets, setTickets] = useState<TicketType[]>([]);
  const [agents, setAgents] = useState<any[]>([]);
  const [issueTypes, setIssueTypes] = useState<any[]>([]);
  const [employees, setEmployees] = useState<any[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<TicketType | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingTicket, setDeletingTicket] = useState<TicketType | null>(null);
  const [selectedTicketId, setSelectedTicketId] = useState<number | null>(null);
  const [feedbackRate, setFeedbackRate] = useState<string>("");
  const [feedbackComment, setFeedbackComment] = useState<string>("");
  const [showFeedbackModal, setShowFeedbackModal] = useState<boolean>(false);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAlert, setShowAlert] = useState<boolean>(false);
  const [showErrorAlert, setShowErrorAlert] = useState<boolean>(false);

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

  const handleFeebackSubmit = async () => {
    console.log(selectedTicketId, feedbackRate, feedbackComment);
    if (!selectedTicketId || !feedbackRate || !feedbackComment) {
      return;
    }

    const feedbackToInsert: FeedbackToInsert = {
      rating: feedbackRate,
      comment: feedbackComment,
      ticketId: selectedTicketId,
    };

    try {
      const response = await axios.post(
        "http://localhost:5087/Api/Feedback",
        feedbackToInsert
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
    setFeedbackRate("");
    setFeedbackComment("");
    setShowFeedbackModal(false);
  };
  const handleCloseModal = () => {
    setSelectedTicketId(null);
    setFeedbackRate("");
    setFeedbackComment("");
    setShowFeedbackModal(false);
  };
  const totalPages = Math.ceil(tickets.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
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
          <div style={{ textAlign: "center" }}>Successfully Submitted Your Feedback !!!</div>
        </Alert>
      )}
      {showErrorAlert && (
        <Alert
          variant="danger"
          onClose={() => setShowErrorAlert(false)}
          dismissible
          style={{ marginLeft: "100px", marginRight: "100px" }}
        >
          <div style={{ textAlign: "center" }}>Feedback has already been submitted for this ticket. !!!</div>
        </Alert>
      )}
      <div className="row">
        <div className="col-8">
          <p className="table-heading">My Tickets</p>
        </div>
        <div className="col-1">
          <Form>
            <InputGroup style={{ width: "300px" }}>
              <Form.Control
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search Ticket"
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
                      <td>
                        {ticket.problem.length > 10
                          ? ticket.problem.slice(0, 20) + "..."
                          : ticket.problem}
                      </td>
                      <td>{ticket.submitDate.split("T")[0]}</td>
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
                            <Badge className={"bg-danger"}>Not Assign</Badge>
                          ) : null
                        ) : null}
                      </td>
                      <td>
                        {ticket.ticketStatus === "Solved" ? (
                          <>
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
                              icon={faStar}
                              style={{
                                color: "#FF615A",
                                cursor: "pointer",
                              }}
                              title="Feedback Ticket"
                              onClick={() => {
                                setSelectedTicketId(ticket.id);
                                setShowFeedbackModal(true);
                              }}
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
                          </>
                        ) : (
                          <>
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
                          </>
                        )}
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
      <Modal show={showFeedbackModal} onHide={handleCloseModal}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>New Feedback</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Your Rate</Form.Label>
              <Form.Select
                aria-label="Default select example"
                value={feedbackRate}
                onChange={(e) => setFeedbackRate(e.target.value)}
              >
                <option value="Better">Select </option>
                <option value="Better">Better</option>
                <option value="Good">Good</option>
                <option value="Worst">Worst</option>
              </Form.Select>
            </Form.Group>
            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                value={feedbackComment}
                onChange={(e) => setFeedbackComment(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleFeebackSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default MyTicketTable;
