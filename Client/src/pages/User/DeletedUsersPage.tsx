import React, { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { BsArrowLeft } from "react-icons/bs";
import {
  getDeletedUsers,
  restoreDeletedUser,
  deleteDeletedUser,
} from "../../api/userApi";
import { User } from "../../types";
import UserTable from "../../components/User/UserTable";
import UserDeleteModal from "../../components/User/UserDeleteModal";

const DeletedUsersPage: React.FC = () => {
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleRestore = async (user: User) => {
    await restoreDeletedUser(user.id);
    setDeletedUsers(deletedUsers.filter((u) => u.id !== user.id));
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (selectedUser) {
      await deleteDeletedUser(selectedUser.id);
      setDeletedUsers(
        deletedUsers.filter((user) => user.id !== selectedUser.id)
      );
      handleCloseModal();
    }
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowDeleteModal(false);
  };

  useEffect(() => {
    getDeletedUsers().then((data) => setDeletedUsers(data));
  }, []);

  return (
    <Container fluid>
      <Row>
        <Col>
          <h2 className="text-center mb-4">Deleted Users</h2>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col>
          <Button
            variant="secondary"
            onClick={() => window.history.back()}
            className="btn-purple"
          >
            <BsArrowLeft /> Go Back
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <UserTable
                      users={deletedUsers}
                      onRestore={handleRestore}
                      onDelete={handleDelete}
                      showRestoreButton={true} onEdit={function (user: User): void {
                          throw new Error("Function not implemented.");
                      } }          />
        </Col>
      </Row>
      <UserDeleteModal
        show={showDeleteModal}
        onHide={handleCloseModal}
        onSubmit={handleConfirmDelete}
        user={selectedUser}
      />
    </Container>
  );
};

export default DeletedUsersPage;
