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

  const handleRowClick = (agent: agentType) => {
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
                        <tr key={agent.id} onClick={() => handleRowClick(agent)}>
                          <td> <img src={`http://localhost:5224/ProfileImages/${agent.profileImage}`} alt="User profile" className="rounded-circle" style={{ width: "45px", height: "45px", cursor: "pointer" }}  /></td>
                          <td> {agent.firstName} </td>                    
                          <td className="text-secondary"> {agent.lastName} </td>
                          <td className="text-secondary"> {agent.email} </td>
                          <td className="text-secondary"> {agent.contact} </td>
                          <td className="text-secondary"> {agent.position} </td>
                          <td className="text-secondary"> {agent.joinDate} </td>
                          <td className="text-secondary"> {agent.teamId} </td>
                          <td className="text-secondary"> {agent.agentStatus} </td>
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
              <Modal.Title><center>{selectedAgent.firstName}</center></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <center><img src={`http://localhost:5224/ProfileImages/${selectedAgent.profileImage}`} alt="User profile" className="rounded-circle" style={{ width: "100px", height: "100px" }} /></center>
              <p>Agent ID: {selectedAgent.id}</p>
              <p>First Name: {selectedAgent.firstName}</p>
              <p>Last Name: {selectedAgent.lastName}</p>
              <p>E mail: {selectedAgent.email}</p>
              <p>Contact: {selectedAgent.contact}</p>
              <p>Position: {selectedAgent.position}</p>
              <p>Join Date: {selectedAgent.joinDate}</p>
              <p>Team: {selectedAgent.teamId}</p>
              <p>Status: {selectedAgent.agentStatus}</p>
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

