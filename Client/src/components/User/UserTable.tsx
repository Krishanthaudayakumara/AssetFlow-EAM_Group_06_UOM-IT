import React from "react";
import { Table, Button } from "react-bootstrap";
import { User } from "../../types";
import { BsPencilSquare, BsTrash, BsArrowRepeat } from "react-icons/bs";

interface Props {
  users: User[];
  selectedUsers: User[];
  onSelect: (user: User) => void;
  onEdit: (user: User) => void;
  onDelete: (user: User) => void;
  onRestore?: (user: User) => void;
  showRestoreButton?: boolean;
  onSelectAll?: () => void;
}

const UserTable: React.FC<Props> = ({
  users,
  selectedUsers,
  onSelect,
  onEdit,
  onDelete,
  onRestore,
  showRestoreButton = true,
  onSelectAll,
}) => {
  const handleCheckboxChange = (user: User) => {
    onSelect(user);
  };

  const handleEditClick = (user: User) => {
    onEdit(user);
  };

  const handleDeleteClick = (user: User) => {
    onDelete(user);
  };

  const handleRestoreClick = (user: User) => {
    onRestore && onRestore(user);
  };

  const handleSelectAllChange = () => {
    onSelectAll && onSelectAll();
  };

  return (
    <div className="table-container shadow p-3 bg-white rounded">
      <Table
        striped
        className="table w-100 small table-borderless table-responsive align-middle align-left"
        hover
      >
        <thead>
          <tr>
            <th>
              <input
                type="checkbox"
                checked={selectedUsers.length === users.length}
                onChange={handleSelectAllChange}
              />
            </th>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
            {showRestoreButton ? <th>Restore</th> : <><th>Edit</th><th>Delete</th></>}
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>
                <input
                  type="checkbox"
                  checked={selectedUsers.includes(user)}
                  onChange={() => handleCheckboxChange(user)}
                />
              </td>
              <td>{user.username}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              {showRestoreButton ? (
                <td>
                  <Button
                    variant="outline-success"
                    onClick={() => handleRestoreClick(user)}
                    className="btn-purple"
                  >
                    <BsArrowRepeat />
                  </Button>
                  </td>
              ) : (
                <>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => handleEditClick(user)}
                      className="btn-l-purple"
                    >
                      <BsPencilSquare />
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => handleDeleteClick(user)}
                      className="btn-orange"
                    >
                      <BsTrash />
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserTable;
