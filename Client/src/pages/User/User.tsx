import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import { getUsers, deleteUser, addUser, editUser } from "../../api/userApi";
import { User } from "../../types";
import UserTable from "../../components/User/UserTable";
import UserModal from "../../components/User/UserModal";
import AddUserModal from "../../components/User/AddUserModal";

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<Partial<User> | null>(null);
  const [showEditModal, setshowEditModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddUser = async (user: User) => {
    await addUser(user);
    const updatedUsers = await getUsers();
    setUsers(updatedUsers);
    setShowAddModal(false); // close the modal
  };

  const handleDelete = async (id: string) => {
    await deleteUser(id);
    setUsers(users.filter((user) => user.id !== id));
  };

  const handleEdit = (user: User) => {
    setSelectedUser(user);
    setshowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setshowEditModal(false);
    setShowAddModal(false);
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
          <Button variant="success" onClick={() => setShowAddModal(true)} className="btn-purple">
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
          />
        </Col>
      </Row>
      {selectedUser && (
        <UserModal
          show={showEditModal}
          onHide={handleCloseModal}
          user={selectedUser!}
          onSubmit={handleSubmit}
        />
      )}
    </Container>
  );
};

export default UserPage;
