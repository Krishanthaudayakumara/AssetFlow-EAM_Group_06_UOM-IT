import React from "react";
import { Modal, Button } from "react-bootstrap";
import { User } from "../../types";

interface Props {
    show: boolean;
    onHide: () => void;
    onSubmit: () => Promise<void>;
    users: User[];
    restoringUser: User | null;
  }

const UserRestoreModal: React.FC<Props> = ({ show, onHide, onSubmit, users,   restoringUser,
}) => {
  const handleRestore = () => {
    onSubmit();
    onHide();
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Confirm Restore User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to restore the selected users?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="success" onClick={handleRestore}>
          Restore
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserRestoreModal;
