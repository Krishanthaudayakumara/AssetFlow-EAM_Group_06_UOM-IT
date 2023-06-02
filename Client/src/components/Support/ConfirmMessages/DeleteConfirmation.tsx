import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
  onConfirm: () => void;
  deletingIssueName: string;
}

const DeleteConfirmation: React.FC<Props> = ({
  show,
  onClose,
  onConfirm,
  deletingIssueName,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header style={{ backgroundColor: "#FF615A" }}>
        <Modal.Title style={{ color: 'white' }}>Confirm Delete</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {deletingIssueName}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onConfirm}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmation;
