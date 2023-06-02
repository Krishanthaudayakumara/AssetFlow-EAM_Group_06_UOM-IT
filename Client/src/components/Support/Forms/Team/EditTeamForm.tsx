import React from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface teamType {
  profileImage: string;
  id: number;
  name: string;
  description: string;
  issueTypeId: number;
}

interface EditTeamFormProps {
  showModal: boolean;
  selectedTeam: teamType | null;
  handleModalClose: () => void;
  handleUpdateTeam: () => void;
  setSelectedTeam: React.Dispatch<React.SetStateAction<teamType | null>>;
}

const EditTeamForm: React.FC<EditTeamFormProps> = ({
  showModal,
  selectedTeam,
  handleModalClose,
  handleUpdateTeam,
  setSelectedTeam,
}) => {
  return (
    <Modal show={showModal} onHide={handleModalClose}>
      {selectedTeam && (
        <>
          <Modal.Header style={{ backgroundColor: "#482890" }}>
            <Modal.Title>
              <div style={{ margin: "20px 180px" }}>
                <img
                  src={`http://localhost:5087/ProfileImages/${selectedTeam.profileImage}`}
                  alt="User profile"
                  className="rounded-circle"
                  style={{ width: "100px", height: "100px" }}
                />
              </div>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h3>
              <div>{selectedTeam.name}</div>
            </h3>
            <form>
              <Form.Group>
                {" "}
                <Form.Label>Name</Form.Label>{" "}
                <Form.Control
                  type="text"
                  placeholder="Name *"
                  required
                  name="name"
                  value={selectedTeam.name}
                  onChange={(e) =>
                    setSelectedTeam({
                      ...selectedTeam,
                      name: e.target.value,
                    })
                  }
                />{" "}
              </Form.Group>
              <br />
              <Form.Group>
                {" "}
                <Form.Label>Description</Form.Label>{" "}
                <Form.Control
                  type="text"
                  placeholder="Description *"
                  required
                  name="description"
                  value={selectedTeam.description}
                  onChange={(e) =>
                    setSelectedTeam({
                      ...selectedTeam,
                      description: e.target.value,
                    })
                  }
                />{" "}
              </Form.Group>
              <br />
              <Form.Group>
                {" "}
                <Form.Label>Issue Type</Form.Label>{" "}
                <Form.Control
                  type="number"
                  placeholder="Issue Type *"
                  required
                  name="issueTypeId"
                  value={selectedTeam.issueTypeId}
                  onChange={(e) =>
                    setSelectedTeam({
                      ...selectedTeam,
                      issueTypeId: Number(e.target.value),
                    })
                  }
                />{" "}
              </Form.Group>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleUpdateTeam}>Update Team</Button>
          </Modal.Footer>
        </>
      )}
    </Modal>
  );
};

export default EditTeamForm;
