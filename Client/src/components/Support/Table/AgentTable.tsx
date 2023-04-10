import { Fragment, useEffect, useState } from "react";
import { Table, Modal, Button, Badge, Form } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "../../../css/Support/Support.css";

interface agentType { profileImage: string; id: number; firstName: string; lastName: string; contact: string; position: string; email: string; joinDate: string; teamId: number; agentStatus: string;}
interface TeamData  {  id: number;  name: string;};


const AgentTable = () => {
  const [agents, setAgents] = useState<agentType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<agentType | null>(null);
  const [teams, setTeams] = useState<TeamData[]>([]);

  

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
        alert("Successfully updated!");
      })
      .catch((error) => {
        alert("Not updated!");
      });
  };

  const handleDeleteAgent = (agent: agentType) => {
    axios
      .delete(`http://localhost:5087/Api/Agent/${agent.id}`)
      .then((response) => {
        setAgents(agents.filter((item) => item.id !== agent.id));
        alert("Successfully deleted!");
      })
      .catch((error) => {
        alert("Not deleted!");
      });
  };

  return (
    <div>
      <p className="table-heading">Support Agents</p>
      <div className="box-shadow">
        <Fragment>
          <div>
            <Table className="support-table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th></th>                  
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Contact</th>
                  <th>Position</th>
                  <th>Email</th>                  
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (
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
                    <td>{agent.contact}</td>
                    <td>{agent.position}</td>
                    <td>{agent.email}</td>                    
                    <td>{agent.agentStatus === "Available" ? (<Badge className={"bg-success"}>Available</Badge>) : (<Badge className={"bg-warning"}>Not Available</Badge> )}</td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: "#482890", cursor: "pointer" }}
                        onClick={() => handleEditAgentClick(agent)}
                      />
                      &nbsp; &nbsp;
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#FF615A", cursor: "pointer" }}
                        onClick={() => handleDeleteAgent(agent)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>

      <Modal show={showModal} onHide={handleModalClose}>
        {selectedAgent && (
          <>
            <Modal.Header style={{ backgroundColor: "#482890" }}>
              <Modal.Title>
                <div style={{ margin: "20px 180px" }}>
                  <img
                    src={`http://localhost:5087/ProfileImages/${selectedAgent.profileImage}`}
                    alt="User profile"
                    className="rounded-circle"
                    style={{ width: "100px", height: "100px" }}
                    
                  />
                </div>
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3>
                <div>
                  {selectedAgent.firstName}&nbsp;{selectedAgent.lastName}
                </div>
              </h3>
              <p>Agent ID: {selectedAgent.id}</p>{" "}
              <p>Join Date: {selectedAgent.joinDate}</p>
              <Form>
                <Form.Group>
                  <Form.Label>Contact</Form.Label>
                  <Form.Control type="tel" value={selectedAgent.contact} onChange={(e) => setSelectedAgent({ ...selectedAgent,contact: e.target.value,})}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Position</Form.Label>
                  <Form.Control type="text" value={selectedAgent.position} onChange={(e) => setSelectedAgent({...selectedAgent, position: e.target.value,})}/>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Email</Form.Label>
                  <Form.Control type="email" value={selectedAgent.email} onChange={(e) => setSelectedAgent({ ...selectedAgent, email: e.target.value,})} />
                </Form.Group>
                <Form.Group>
                  <Form.Label>Team</Form.Label>
                  <Form.Select  aria-label="Default select example"  name="teamId"  value={selectedAgent.teamId}  onChange={(e) => setSelectedAgent({...selectedAgent, teamId: Number(e.target.value), })} >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                 <option key={team.id} value={team.id}>{team.name}</option> ))}
               </Form.Select>
                </Form.Group>
                <Form.Group>
                  <Form.Label>Status</Form.Label>
                  <Form.Select name="agentStatus" value={selectedAgent.agentStatus} onChange={(e) => setSelectedAgent({...selectedAgent, agentStatus: e.target.value, })}>
                    <option value="Available">Available</option>{" "}
                    <option value="Not Available">Not Available</option>
                  </Form.Select>
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={() => handleUpdateAgent()}>Update</Button>             
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
};

export default AgentTable;
