import React from "react";
import { Form, Button } from "react-bootstrap";

interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface Props {
  user: IUser | null;
  onSubmit: (user: IUser) => void;
  onCancel: () => void;
}

const EditUserForm: React.FC<Props> = ({ user, onSubmit, onCancel }) => {
  const [editingUser, setEditingUser] = React.useState<IUser | null>(user);

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    if (editingUser) {
      onSubmit(editingUser);
    }
  };

  const handleCancel = () => {
    setEditingUser(user);
    onCancel();
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setEditingUser((prevUser) => {
      if (prevUser) {
        return { ...prevUser, [name]: value };
      } else {
        return null;
      }
    });
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          placeholder="Enter username"
          value={editingUser?.username || ""}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email</Form.Label>
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter email"
          value={editingUser?.email || ""}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          placeholder="Password"
          value={editingUser?.password || ""}
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          value={editingUser?.role || ""}
          onChange={handleInputChange}
        >
          <option value="">--Select--</option>
          <option value="Admin">Admin</option>
          <option value="User">User</option>
        </Form.Control>
      </Form.Group>

      <Button variant="secondary" onClick={handleCancel} className="me-2">
        Cancel
      </Button>
      <Button variant="primary" type="submit">
        Save Changes
      </Button>
    </Form>
  );
};

export default EditUserForm;
