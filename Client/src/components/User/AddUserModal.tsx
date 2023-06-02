import React, { useState } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import UserForm from "./UserForm";
import { User } from "../../types";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (user: User) => void;
}

const AddUserModal: React.FC<Props> = ({ show, onHide, onSubmit }) => {
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get("email") as string;
    const username = formData.get("username") as string;
    const password = formData.get("password") as string;
    const role = formData.get("role") as string;

    // Email validation
    if (!email || !email.match(/^([\w.%+-]+)@([\w-]+\.)+([\w]{2,})$/i)) {
      setError("Please enter a valid email address.");
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      // Make the API request
      await onSubmit({ email, username, password, role } as User);
      // Clear the form fields
      e.currentTarget.reset();
      onHide();
    } catch (error) {
      setError("An error occurred while adding the user.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <UserForm onSubmit={handleSubmit} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-l-purple" onClick={onHide}>
          Close
        </Button>
        <Button className="btn-orange" type="submit" form="userForm">
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddUserModal;
