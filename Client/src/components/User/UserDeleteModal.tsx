import React from "react";
import { Modal, Button } from "react-bootstrap";
import { User } from "../../types";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (users: User[]) => void;
  users: User[];
}

const UserDeleteModal: React.FC<Props> = ({ show, onHide, onSubmit, users }) => {
  const handleDelete = () => {
    onSubmit(users);
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Delete User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the selected users?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserDeleteModal;
