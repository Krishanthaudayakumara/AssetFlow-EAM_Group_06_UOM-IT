import React from "react";
import { Modal, Button } from "react-bootstrap";
import UserForm from "./UserForm";
import { User, UserRole } from "../../types";

interface Props {
  show: boolean;
  onHide: () => void;
  user: Partial<User>;
  onSubmit: (user: User) => void;
}

const UserModal: React.FC<Props> = ({ show, onHide, user, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as UserRole;
    onSubmit({ ...user, email, username, password, role } as User);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{user ? "Edit" : "Add"} User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <UserForm user={user} onSubmit={handleSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" type="submit" form="userForm">
          {user ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default UserModal;
