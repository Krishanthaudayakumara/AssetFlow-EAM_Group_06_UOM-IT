import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { getUsers, deleteUser, addUser, editUser } from "../../api/userApi";
import { User } from "../../types";
import UserTable from "../../components/User/UserTable";
import UserModal from "../../components/User/UserModal";
import AddUserModal from "../../components/User/AddUserModal";
import UserDeleteModal from "../../components/User/UserDeleteModal";
import {BsTrash} from "react-icons/bs";
import "./../../css/Table.css";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false);

  const handleAddUser = async (user: User) => {
    await addUser(user);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    setShowAddModal(false); // close the modal
  };

  const handleDelete = (user: User) => {
    setSelectedUsers([user]);
    setShowDeleteConfirmation(true);
  };

  const handleConfirmDelete = async () => {
    const selectedUserIds = selectedUsers.map((user) => user.id);
    await Promise.all(selectedUserIds.map((id) => deleteUser(id)));

    setUsers(users.filter((user) => !selectedUserIds.includes(user.id)));

    setSelectedUsers([]);
    handleCloseModal();
  };

  const handleEdit = (user: User) => {
    setSelectedUsers([user]);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUsers([]);
    setShowAddModal(false);
    setShowEditModal(false);
    setShowDeleteConfirmation(false);
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

  const handleSelectUser = (user: User) => {
    const isSelected = selectedUsers.includes(user);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleDeleteSelected = async () => {
    if (selectedUsers.length > 0) {
      setShowDeleteConfirmation(true);
    }
  };

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="table-page-heading">USER MANAGEMENT</h2>
        </Col>
     <Col>
      <Row className="mb-3">
        <Col>
          <Button
            variant="success"
            onClick={() => setShowAddModal(true)}
            className="btn-purple"
          >
            <BsPlus /> Add User
          </Button>
          {selectedUsers.length > 0 && (
            <Button
              variant="danger"
              onClick={handleDeleteSelected}
              className="btn-orange"
            >
              Delete Selected
            </Button>
          )}

          <AddUserModal
            show={showAddModal}
            onHide={handleCloseModal}
            onSubmit={handleAddUser}
          />
        </Col>
        <Col style={
            {marginTop: "20px"}
          }>
          <a href="/deleted-users" className="btn-purple"  style={
            { textDecoration:"none"}
          }> <BsTrash/> Trash
          </a>
        </Col>
      </Row>
      </Col>
      </Row>
      <Row>
        <Col>
          <UserTable
            users={users}
            selectedUsers={selectedUsers}
            onSelect={handleSelectUser}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showRestoreButton={false}
          />
        </Col>
      </Row>
      <UserModal
        show={showEditModal}
        onHide={handleCloseModal}
        user={selectedUsers[0]}
        onSubmit={handleSubmit}
      />
      <UserDeleteModal
        show={showDeleteConfirmation}
        onHide={() => setShowDeleteConfirmation(false)}
        onSubmit={handleConfirmDelete}
        users={selectedUsers}
      />
    </Container>
  );
};

export default UserPage;
