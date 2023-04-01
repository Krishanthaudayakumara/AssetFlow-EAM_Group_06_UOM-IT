import React from "react";
import { Table, Button } from "react-bootstrap";
import { User } from "../../types";
import { BsPencilSquare, BsTrash } from "react-icons/bs";


interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (userId: string) => void;
}

const UserTable: React.FC<Props> = ({ users, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Username</th>
          <th>Email</th>
          <th>Role</th>
          <th>Edit</th>
          <th>Delete</th>

        </tr>
      </thead>
      <tbody>
        {users.map((user) => (
          <tr key={user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
            <td>
              <Button
                variant="outline-primary"
                onClick={() => onEdit(user)}
              >
                <BsPencilSquare />
              </Button>{" "}
            </td>
            <td>
              <Button
                variant="outline-danger"
                onClick={() => onDelete(user.id)}
              >
                <BsTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default UserTable;
