import { Fragment, useEffect, useState } from "react";
import { Table, Modal, Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

import axios from "axios";

interface agentType{
  profileImage: string;
  id: number;
  firstName: string;
  lastName: string;
  contact: string;
  position: string;
  email: string;
  joinDate: string;
  teamId: number;
  agentStatus: number;
}

const AgentTable = () => {
  const [agents, setAgents] = useState<agentType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<agentType | null>(null);

  const handleImageClick = (agent: agentType) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };

  useEffect(() => {
    axios
      .get("http://localhost:5224/Api/Agent")
      .then((response) => {
        setAgents(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);

  return (
    <div>
      <p style={{ margin: "0 0 30px 70px", color: "#482890", fontSize: "18px", fontWeight: "bold", }}> Avaliable Agents </p>
      <div  className="shadow p-3 bg-white rounded" style={{ margin: "30px 0 0 65px" }} >
        <Fragment>
          <div>
            <Table
              className="table w-100 small table-borderless table-responsiv align-middle align-left" hover  style={{ fontSize: "14px" }} >
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th></th>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Contact</th>
                  <th>Position</th>
                  <th>Join Date</th>
                  <th>Team</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (                      
                        <tr key={agent.id}>
                          <td> <img src={`http://localhost:5224/ProfileImages/${agent.profileImage}`} alt="User profile" className="rounded-circle" style={{ width: "45px", height: "45px", cursor: "pointer" }} onClick={() => handleImageClick(agent)} /></td>
                          <td>{agent.id}</td>
                          <td> {agent.firstName} </td>                    
                          <td> {agent.lastName} </td>
                          <td> {agent.email} </td>
                          <td> {agent.contact} </td>
                          <td> {agent.position} </td>
                          <td> {agent.joinDate} </td>
                          <td> {agent.teamId} </td>
                          <td> {agent.agentStatus} </td>
                        </tr>                      
                    ))}
              </tbody>
            </Table>           
          </div>
        </Fragment>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        {selectedAgent && (
          <>
            <Modal.Header closeButton>
              <Modal.Title>{selectedAgent.firstName}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <img src={`http://localhost:5224/ProfileImages/${selectedAgent.profileImage}`} alt="User profile" className="rounded-circle" style={{ width: "100px", height: "100px" }} />
              <p>ID: {selectedAgent.id}</p>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>Close</Button>
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default AgentTable;

