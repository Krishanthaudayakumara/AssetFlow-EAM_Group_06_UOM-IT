import React from "react";
import { Table, Button } from "react-bootstrap";
import { User } from "../../types";
import { BsPencilSquare, BsTrash, BsArrowRepeat } from "react-icons/bs";

interface Props {
  users: User[];
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRestore?: (user: User) => void;
  showRestoreButton?: boolean;
}

const UserTable: React.FC<Props> = ({
  users,
  onEdit,
  onDelete,
  onRestore,
  showRestoreButton = true,
}) => {
  return (
    <div className="table-container shadow p-3 bg-white rounded">
      <Table
        striped
        className="table w-100 small table-borderless table-responsive align-middle align-left"
        hover
      >
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            {showRestoreButton ? (
              <>
                <th>Restore</th>
                <th>Delete</th>
              </>
            ) : (
              <th>Action</th>
            )}
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
                {showRestoreButton ? (
                  <Button
                    variant="outline-success"
                    onClick={() => onRestore && onRestore(user)}
                    className="btn-purple"
                  >
                    <BsArrowRepeat />
                  </Button>
                ) : (
                  <div>
                    <Button
                      variant="outline-primary"
                      onClick={() => onEdit(user)}
                      className="btn-l-purple"
                    >
                      <BsPencilSquare />
                    </Button>
                    <Button
                      variant="outline-danger"
                      onClick={() => onDelete(user)}
                      className="btn-orange"
                    >
                      <BsTrash />
                    </Button>
                  </div>
                )}
              </td>
              {showRestoreButton && (
                <td>
                  <Button
                    variant="outline-danger"
                    onClick={() => onDelete(user)}
                    className="btn-orange"
                  >
                    <BsTrash />
                  </Button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
