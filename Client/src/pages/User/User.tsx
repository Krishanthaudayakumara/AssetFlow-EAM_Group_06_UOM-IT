import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { getUsers, deleteUser, addUser, editUser } from "../../api/userApi";
import { User } from "../../types";
import UserTable from "../../components/User/UserTable";
import UserModal from "../../components/User/UserModal";
import AddUserModal from "../../components/User/AddUserModal";
import UserDeleteModal from "../../components/User/UserDeleteModal";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleAddUser = async (user: User) => {
    await addUser(user);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    setShowAddModal(false); // close the modal
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser && selectedUser.id) {
      await deleteUser(selectedUser.id);
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      handleCloseModal();
    }
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowEditModal(false);
    setShowDeleteModal(false);
  };

  const handleSubmit = async (user: User) => {
    try {
      if (user.id) {
        // update existing user
        await editUser(user);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
      } else {
        // create new user
        await addUser(user);
        const updatedUsers = await getUsers();
        setUsers(updatedUsers);
      }
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUsers().then((data) => setUsers(data));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center mb-4">User Management</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button
            variant="success"
            onClick={() => setShowAddModal(true)}
            className="btn-purple"
          >
            <BsPlus /> Add User
          </Button>
          <AddUserModal
            show={showAddModal}
            onHide={handleCloseModal}
            onSubmit={handleAddUser}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <UserTable
            users={users}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showRestoreButton={false}
          />
        </Col>
      </Row>
      <UserModal
        show={showEditModal}
        onHide={handleCloseModal}
        user={selectedUser!}
        onSubmit={handleSubmit}
      />
      <UserDeleteModal
        show={showDeleteModal}
        onHide={handleCloseModal}
        onSubmit={handleConfirmDelete}
        user={selectedUser}
      />
    </Container>
  );
};

export default UserPage;
