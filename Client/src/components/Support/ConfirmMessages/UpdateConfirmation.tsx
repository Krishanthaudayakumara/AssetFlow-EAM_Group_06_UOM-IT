import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
  updatedName: string;
}

const UpdateConfirmation: React.FC<Props> = ({
  show,
  onClose,
  updatedName,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header style={{ backgroundColor: "#4CAF50" }}>
      <Modal.Title style={{ color: 'white' }}>Update Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Successfully updated {updatedName}.
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UpdateConfirmation;
