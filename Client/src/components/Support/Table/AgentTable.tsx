import { Fragment, useEffect, useState } from "react";
import { Table, Badge, Form, InputGroup, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Support/Support.css";
import EditAgentForm from "../Forms/Agent/EditAgentForm";
import DeleteConfirmation from "../ConfirmMessages/DeleteConfirmation";
import DeleteError from "../ConfirmMessages/DeleteError";
import { FaSearch } from "react-icons/fa";
import UpdateConfirmation from "../ConfirmMessages/UpdateConfirmation";
import PaginationComponent from "../pagination";
import AgentCardView from "../Card/AgentCardView";
import AgentToTicket from "./AgentToTicket";

interface agentType {
  profileImage: string;
  id: number;
  firstName: string;
  lastName: string;
  contact: string;
  position: string;
  email: string;
  joinDate: string;
  teamId: number;
  agentStatus: string;
}
interface TeamData {
  id: number;
  name: string;
}

const AgentTable = () => {
  const [agents, setAgents] = useState<agentType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<agentType | null>(null);
  const [teams, setTeams] = useState<TeamData[]>([]);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingAgent, setDeletingAgent] = useState<agentType | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [cardViewActive, setCardViewActive] = useState(false);
  const [showAgentToTicketTable, setshowAgentToTicketTable] = useState(false);

  const recordsPerPage = 6;

  useEffect(() => {
    const fetchTeams = async () => {
      const response = await axios.get("http://localhost:5087/Api/Team");
      setTeams(response.data);
    };
    fetchTeams();
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:5087/Api/Agent")
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  const handleEditAgentClick = (agent: agentType) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  const handleModalClose = () => {
    setSelectedAgent(null);
    setShowModal(false);
  };
  const handleUpdateAgent = () => {
    axios
      .put(
        `http://localhost:5087/Api/Agent/${selectedAgent?.id}`,
        selectedAgent
      )
      .then((response) => {
        setAgents(
          agents.map((agent) =>
            agent.id === selectedAgent?.id ? selectedAgent : agent
          )
        );
        setShowModal(false);
        setShowUpdateModal(true);
      })
      .catch((error) => {
        // Handle other errors
      });
  };

  const handleDeleteAgent = (agent: agentType) => {
    setDeletingAgent(agent);
    setShowDeleteModal(true);
  };

  const confirmDeleteAgent = () => {
    axios
      .delete(`http://localhost:5087/Api/Agent/${deletingAgent?.id}`)
      .then((response) => {
        setAgents(agents.filter((item) => item.id !== deletingAgent?.id));
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          // Display the error message
          setErrorMessage(error.response.data);
        } else {
          // Handle other errors
        }
      })
      .finally(() => {
        setDeletingAgent(null);
        setShowDeleteModal(false);
      });
  };
  const resetErrorMessage = () => {
    setErrorMessage(null);
  };
  const totalPages = Math.ceil(agents.length / recordsPerPage);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };
  const handleCardViewClick = () => {
    setCardViewActive(!cardViewActive);
  };
  const handleAgentClick = (agent: agentType) => {
    setSelectedAgent(agent);
    setshowAgentToTicketTable(true);
  };

  return (
    <div>
      {showAgentToTicketTable ? (
        <AgentToTicket agentId={selectedAgent?.id ?? 0} />
      ) : (
        <div>
          <div className="row">
            <div className="col-6">
              
            </div>
            <div className="col-2">
              <Button onClick={handleCardViewClick}>
                {cardViewActive ? "Table View" : "Card View"}
              </Button>
            </div>
            <div className="col-1">
              <Form>
                <InputGroup style={{ width: "300px" }}>
                  <Form.Control
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search Agent by firstname"
                  />
                  <InputGroup.Text>
                    <FaSearch />
                  </InputGroup.Text>
                </InputGroup>
              </Form>
            </div>
          </div>
          <DeleteError
            errorMessage={errorMessage}
            onResetError={resetErrorMessage}
          />
          {cardViewActive ? (
            <AgentCardView
              agents={agents}
              search={search}
              currentPage={currentPage}
              recordsPerPage={recordsPerPage}
              onEditIssue={handleEditAgentClick}
              onDeleteIssue={handleDeleteAgent}
              onAgentClick={handleAgentClick}
            />
          ) : (
            <div className="box-shadow">
              <Fragment>
                <div>
                  <Table className="support-table">
                    <thead>
                      <tr style={{ color: "#482890" }}>
                        <th></th>
                        <th>First Name</th>
                        <th>Last Name</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {agents
                        .filter((agent) => {
                          return search.toLowerCase() === ""
                            ? agent
                            : agent.firstName.toLowerCase().includes(search);
                        })
                        .slice(
                          (currentPage - 1) * recordsPerPage,
                          currentPage * recordsPerPage
                        )
                        .map((agent) => (
                          <tr key={agent.id}>
                            <td>
                              <img
                                src={`http://localhost:5087/ProfileImages/${agent.profileImage}`}
                                alt="User profile"
                                className="rounded-circle"
                                style={{
                                  width: "45px",
                                  height: "45px",
                                  cursor: "pointer",
                                }}
                              />
                            </td>
                            <td>{agent.firstName}</td>
                            <td>{agent.lastName}</td>
                            <td>{agent.position}</td>
                            <td>
                              {agent.agentStatus === "Available" ? (
                                <Badge className={"bg-success"}>
                                  Available
                                </Badge>
                              ) : (
                                <Badge className={"bg-warning"}>
                                  Not Available
                                </Badge>
                              )}
                            </td>
                            <td>
                              {" "}
                              <FontAwesomeIcon
                                icon={faHome}
                                style={{ cursor: "pointer" }}
                                title="Team Tickets"
                                onClick={() => handleAgentClick(agent)}
                              />
                              &nbsp; &nbsp; &nbsp;
                              <FontAwesomeIcon
                                icon={faPen}
                                style={{ color: "#482890", cursor: "pointer" }}
                                title="Edit Agent"
                                onClick={() => handleEditAgentClick(agent)}
                              />
                              &nbsp; &nbsp; &nbsp;
                              <FontAwesomeIcon
                                icon={faTrash}
                                style={{ color: "#FF615A", cursor: "pointer" }}
                                onClick={() => handleDeleteAgent(agent)}
                                title="Delete Agent"
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </Table>
                </div>
              </Fragment>
            </div>
          )}

          <EditAgentForm
            showModal={showModal}
            selectedAgent={selectedAgent}
            teams={teams}
            handleModalClose={handleModalClose}
            handleUpdateAgent={handleUpdateAgent}
            setSelectedAgent={setSelectedAgent}
          />
          <UpdateConfirmation
            show={showUpdateModal}
            onClose={() => setShowUpdateModal(false)}
            updatedName={selectedAgent?.firstName || ""}
          />
          <DeleteConfirmation
            show={showDeleteModal}
            onClose={() => setShowDeleteModal(false)}
            onConfirm={confirmDeleteAgent}
            deletingIssueName={deletingAgent?.firstName || ""}
          />
          <div className="pagination-wrapper">
            <PaginationComponent
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default AgentTable;
