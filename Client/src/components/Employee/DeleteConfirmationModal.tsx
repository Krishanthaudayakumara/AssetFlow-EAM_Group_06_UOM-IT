import React from "react";
import { Modal, Button } from "react-bootstrap";
import { Employee } from "../../types";

interface Props {
  show: boolean;
  employee: Employee | null;
  onClose: () => void;
  onDelete: () => void;
}

const DeleteConfirmationModal: React.FC<Props> = ({
  show,
  employee,
  onClose,
  onDelete,
}) => {
  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {employee && (
          <p>
            Are you sure you want to delete the employee:{" "}
            <strong>
              {employee.firstName} {employee.lastName}
            </strong>
            ?
          </p>
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteConfirmationModal;
