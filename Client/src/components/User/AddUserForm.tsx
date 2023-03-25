import React, { useState } from "react";
import { Form, Modal, Button } from "react-bootstrap";
import axios from "axios";

interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface IAddUserFormProps {
  show: boolean;
  handleClose: () => void;
  handleAddUser: () => void;
}

const AddUserForm: React.FC<IAddUserFormProps> = ({
  show,
  handleClose,
  handleAddUser,
}) => {
  const [newUser, setNewUser] = useState<IUser>({
    id: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior

    const response = await axios.post(
      "http://localhost:5087/api/auth/register",
      newUser
    );
    if (response.data.isSuccess) {
      alert(response.data.message);
      setNewUser({
        id: "",
        username: "",
        email: "",
        password: "",
        role: "",
      });
      handleAddUser();
      handleClose();
    } else {
      alert(response.data.message);
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleFormSubmit}>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter username"
              value={newUser.username}
              onChange={(e) =>
                setNewUser({ ...newUser, username: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Enter email"
              value={newUser.email}
              onChange={(e) =>
                setNewUser({ ...newUser, email: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              placeholder="Password"
              value={newUser.password}
              onChange={(e) =>
                setNewUser({ ...newUser, password: e.target.value })
              }
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicRole">
            <Form.Label>Role</Form.Label>
            <Form.Control
              as="select"
              value={newUser.role}
              onChange={(e) =>
                setNewUser({ ...newUser, role: e.target.value })
              }
            >
              <option value="">--Select--</option>
              <option value="Admin">Admin</option>
              <option value="User">User</option>
            </Form.Control>
          </Form.Group>

          <Button variant="primary" type="submit">
            Add User
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default AddUserForm;
