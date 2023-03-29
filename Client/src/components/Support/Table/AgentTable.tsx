import { Fragment, useEffect, useState } from "react";
import { Table, Modal, Button, Badge } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";


interface agentType{
  profileImage: string;
  id: number;
  firstName: string;
 
}

const AgentTable = () => {
  const [agents, setAgents] = useState<agentType[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAgent, setSelectedAgent] = useState<agentType | null>(null);

  const handleRowClick = (agent: agentType) => {
    setSelectedAgent(agent);
    setShowModal(true);
  };
  const handleDelete = (id: number) => {
    axios
      .delete(`http://localhost:5224/Api/Agent/${selectedAgent?.id}`)
      .then(() => {
        setAgents((prevAgents) =>
          prevAgents.filter((agent) => agent.id !== selectedAgent?.id)
        );
        setSelectedAgent(null);
        setShowModal(false);
      })
      .catch((error) => {
        alert(error);
      });
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
                  
                </tr>
              </thead>
              <tbody>
                {agents.map((agent) => (                      
                        <tr key={agent.id} onClick={() => handleRowClick(agent)}>
                          <td> <img src={`http://localhost:5224/ProfileImages/${agent.profileImage}`} alt="User profile" className="rounded-circle" style={{ width: "45px", height: "45px", cursor: "pointer" }}  /></td>
                          <td> {agent.firstName} </td>                    
                         
                        </tr>                      
                    ))}
              </tbody>
            </Table>           
          </div>
        </Fragment>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)} >
        {selectedAgent && (
          <>
            <Modal.Header style={{backgroundColor:"#482890"}}>
              <Modal.Title><div style={{margin:"20px 180px"}}><img src={`http://localhost:5224/ProfileImages/${selectedAgent.profileImage}`} alt="User profile" className="rounded-circle" style={{ width: "100px", height: "100px" }} /></div></Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <h3><div>{selectedAgent.firstName}</div></h3>
              <p>Agent ID: {selectedAgent.id}</p>
              <p>First Name: {selectedAgent.firstName}</p>
             
            </Modal.Body>
            <Modal.Footer >
              <center><Button>Update</Button></center>
              <Button onClick={() => handleDelete(selectedAgent.id) }>Delete</Button>
              
            </Modal.Footer>
          </>
        )}
      </Modal>
    </div>
  );
}

export default AgentTable;

