import { Modal, Button, Form } from "react-bootstrap";
import DefaultProfilePicture from "../../DefaultProfilePicture";

export interface issueType {
  id: number;
  name: string;
}
interface Props {
  show: boolean;
  onClose: () => void;
  onUpdate: () => void;
  selectedIssue: issueType | null;
  setSelectedIssue: (issue: issueType) => void;
}

const EditIssueTypeForm = ({
  show,
  onClose,
  onUpdate,
  selectedIssue,
  setSelectedIssue,
}: Props) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header style={{ backgroundColor: "#482890" }}>
        <Modal.Title style={{ color: "white" }}>Edit Issue Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {selectedIssue && (
          <Form>
            <Form.Group controlId="formIssueName">
              <Form.Label>Issue Type</Form.Label>
              <Form.Control
                type="text"
                value={selectedIssue.name}
                onChange={(e) =>
                  setSelectedIssue({
                    ...selectedIssue,
                    name: e.target.value,
                  })
                }
                required
              />
            </Form.Group>
          </Form>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={onUpdate}>
          Update Issue
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditIssueTypeForm;
