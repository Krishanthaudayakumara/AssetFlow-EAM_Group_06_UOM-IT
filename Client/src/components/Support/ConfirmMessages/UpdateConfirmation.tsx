import { Modal, Button } from "react-bootstrap";

interface Props {
  show: boolean;
  onClose: () => void;
  updatedIssueName: string;
}

const UpdateConfirmation: React.FC<Props> = ({
  show,
  onClose,
  updatedIssueName,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header style={{ backgroundColor: "#4CAF50" }}>
        <Modal.Title>Update Successful</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Successfully updated {updatedIssueName}.
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
