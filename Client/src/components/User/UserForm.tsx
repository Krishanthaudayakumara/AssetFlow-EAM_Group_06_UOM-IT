import React from "react";
import { Form } from "react-bootstrap";
import { User, UserRole } from "../../types";

interface Props {
  user?: Partial<User>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<Props> = ({ user = {}, onSubmit }) => {
  return (
    <Form id="userForm" onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          defaultValue={user.email}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          defaultValue={user.username}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control
          type="password"
          name="password"
          defaultValue={user.password}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          defaultValue={user.role || UserRole.Employee}
        >
          <option value={UserRole.Employee}>Employee</option>
          <option value={UserRole.Admin}>Admin</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default UserForm;
