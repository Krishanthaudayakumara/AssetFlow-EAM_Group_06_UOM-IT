import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import "../../../../css/Support/Support.css";

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
interface EditAgentFormProps {
  showModal: boolean;
  selectedAgent: agentType | null;
  teams: TeamData[];
  handleModalClose: () => void;
  handleUpdateAgent: () => void;
  setSelectedAgent: React.Dispatch<React.SetStateAction<agentType | null>>;
}

const EditAgentForm: React.FC<EditAgentFormProps> = ({
  showModal,
  selectedAgent,
  teams,
  handleModalClose,
  handleUpdateAgent,
  setSelectedAgent,
}) => {
  return (
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
            <div className="details-container">
              <div className="detail"><span>Agent ID:</span> {selectedAgent.id}</div>
              <div className="detail">                
                <span>Join Date:</span> {selectedAgent.joinDate}
              </div>
            </div>
            <Form>
              <Form.Group>
                <Form.Label>Contact</Form.Label>
                <Form.Control
                  type="tel"
                  value={selectedAgent.contact}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      contact: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Position</Form.Label>
                <Form.Control
                  type="text"
                  value={selectedAgent.position}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      position: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  value={selectedAgent.email}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      email: e.target.value,
                    })
                  }
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Team</Form.Label>
                <Form.Select
                  aria-label="Default select example"
                  name="teamId"
                  value={selectedAgent.teamId}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      teamId: Number(e.target.value),
                    })
                  }
                >
                  <option value="">Select Team</option>
                  {teams.map((team) => (
                    <option key={team.id} value={team.id}>
                      {team.name}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
              <Form.Group>
                <Form.Label>Status</Form.Label>
                <Form.Select
                  name="agentStatus"
                  value={selectedAgent.agentStatus}
                  onChange={(e) =>
                    setSelectedAgent({
                      ...selectedAgent,
                      agentStatus: e.target.value,
                    })
                  }
                >
                  <option value="Available">Available</option>
                  <option value="Not Available">Not Available</option>
                </Form.Select>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleUpdateAgent}>Update</Button>
            <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default EditAgentForm;
