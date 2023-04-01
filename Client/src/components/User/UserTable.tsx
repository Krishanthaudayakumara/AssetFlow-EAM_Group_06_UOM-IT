import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

interface IUser {
    id: string;
    username: string;
    email: string;
    password: string;
    role: string;
  }

interface IUserTableProps {
  users: IUser[];
  onEditUser: (user: IUser) => void;
  onDeleteUser: (id: string) => void;
}

const UserTable: React.FC<IUserTableProps> = ({
  users,
  onEditUser,
  onDeleteUser,
}) => {
  return (
    <Table striped bordered hover className="mt-3">
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
              <Button variant="outline-primary" onClick={() => onEditUser(user)}>
                <BsPencilSquare />
              </Button>
            </td>
            <td>
              <Button
                variant="outline-danger"
                onClick={() => onDeleteUser(user.id)}
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
