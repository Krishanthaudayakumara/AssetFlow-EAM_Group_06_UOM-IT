import { Button, Modal } from "react-bootstrap";

interface SuccessModalProps {
  show: boolean;
  handleClose: () => void;
  formData: string;
}

const AddConfirmation = ({ show, handleClose, formData }: SuccessModalProps) => {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header style={{ backgroundColor: "#FF615A" }}>
        <Modal.Title>Success</Modal.Title>
      </Modal.Header>
      <Modal.Body>Successfully added {formData} !</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddConfirmation;
