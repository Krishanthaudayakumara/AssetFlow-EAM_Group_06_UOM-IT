import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Table,
  Modal,
} from "react-bootstrap";
import { BsArrowRightCircle, BsPencilSquare, BsTrash } from "react-icons/bs";
import axios from "axios";
import UserTable from "../components/User/UserTable";
import AddUserForm from "../components/User/AddUserForm";
import EditUserForm from "../components/User/EditUserForm";


interface IUser {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}

const User: React.FC = () => {
  const [showAddUserModal, setShowAddUserModal] = useState<boolean>(false);
  const [users, setUsers] = useState<IUser[]>([]);
  const [newUser, setNewUser] = useState<IUser>({
    id: "",
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const [showEditUserModal, setShowEditUserModal] = useState<boolean>(false);
  const [editingUser, setEditingUser] = useState<IUser | null>(null);

  const [showAddUserForm, setShowAddUserForm] = useState(false);
  const toggleAddUserForm = () => {
    setShowAddUserForm(!showAddUserForm);
  };

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const response = await axios.get("http://localhost:5087/api/auth/users");
    setUsers(response.data);
  };


  const handleAddUserModalClose = () => {
    setShowAddUserModal(false);
  };

  

  const handleEditUser = (user: IUser) => {
    setEditingUser(user);
    setShowEditUserModal(true);
  };

  const handleEditUserSubmit = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault(); // Prevent the default form submission behavior

    if (editingUser) {
      try {
        const response = await axios.put(
          "http://localhost:5087/api/auth/users/" + editingUser.id,
          editingUser
        );
        console.log(response.data); // Log the server response
      } catch (error) {
        console.error(error); // Log any errors that occur
      }
    }
  };

  const handleDeleteUser = async (id: string) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      const response = await axios.delete(
        `http://localhost:5087/api/auth/users/${id}`
      );
      if (response.data.isSuccess) {
        alert(response.data.message);
        getUsers();
      } else {
        alert(response.data.message);
      }
    }
  };

  return (
    <>
      <Container>
        <Row>
          <Col>
            <h3 className="mt-5 mb-3">Users</h3>
          </Col>
          <Col className="text-end">
            <Button variant="primary" onClick={toggleAddUserForm}>
              Add User <BsArrowRightCircle />
            </Button>
          </Col>
        </Row>
        <UserTable
          users={users}
          onEditUser={handleEditUser}
          onDeleteUser={handleDeleteUser}
        />
      </Container>{" "}
      <AddUserForm
        show={showAddUserForm}
        handleClose={toggleAddUserForm}
        handleAddUser={() => console.log("User added")}
      />
      <Modal
        show={showEditUserModal}
        onHide={() => setShowEditUserModal(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleEditUserSubmit}>
            <Form.Group className="mb-3" controlId="formBasicUsername">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={editingUser?.username || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser!, username: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                value={editingUser?.email || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser!, email: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={editingUser?.password || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser!, password: e.target.value })
                }
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                value={editingUser?.role || ""}
                onChange={(e) =>
                  setEditingUser({ ...editingUser!, role: e.target.value })
                }
              >
                <option value="">--Select--</option>
                <option value="Admin">Admin</option>
                <option value="User">User</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Save Changes
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default User;
