import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import UserTable from "../Client/src/components/User/UserTable";
import AddUserForm from "../Client/src/components/User/AddUserForm";
import EditUserForm from "../Client/src/components/User/EditUserForm";

interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

interface IUserModalProps {
  users: IUser[];
  onAddUser: (user: IUser) => void;
  onUpdateUser: (user: IUser) => void;
  onDeleteUser: (userId: string) => void;
}

const UserModal: React.FC<IUserModalProps> = ({
  users,
  onAddUser,
  onUpdateUser,
  onDeleteUser,
}) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState<IUser | null>(null);

  const handleShowAddModal = () => setShowAddModal(true);
  const handleCloseAddModal = () => setShowAddModal(false);
  const handleAddUser = (newUser: IUser) => {
    onAddUser(newUser);
    handleCloseAddModal();
  };

  const handleShowEditModal = (user: IUser) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };
  const handleCloseEditModal = () => setShowEditModal(false);
  const handleUpdateUser = (updatedUser: IUser) => {
    onUpdateUser(updatedUser);
    handleCloseEditModal();
  };

  const handleDeleteUser = (userId: string) => onDeleteUser(userId);

  return (
    <>
      <Button variant="primary" onClick={handleShowAddModal}>
        Add User
      </Button>
      <UserTable
        users={users}
        onEditUser={handleShowEditModal}
        onDeleteUser={handleDeleteUser}
      />
      <AddUserForm
        show={showAddModal}
        onClose={handleCloseAddModal}
        onAddUser={handleAddUser}
      />
      <EditUserForm
        show={showEditModal}
        onClose={handleCloseEditModal}
        onSubmit={handleUpdateUser}
        user={selectedUser}
      />
    </>
  );
};

export default UserModal;
