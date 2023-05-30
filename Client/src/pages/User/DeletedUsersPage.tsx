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
import UserRestoreModal from "../../components/User/UserRestoreModal";

const DeletedUsersPage: React.FC = () => {
  const [deletedUsers, setDeletedUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [showRestoreSelected, setShowRestoreSelected] = useState(false);
  const [showRestoreModal, setShowRestoreModal] = useState(false);
  const [restoringUser, setRestoringUser] = useState<User | null>(null);

  const handleRestore = async (user: User) => {
    setRestoringUser(user);
    setShowRestoreModal(true);
  };

  const handleDelete = (user: User) => {
    setSelectedUsers([user]);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async (users: User[]) => {
    const selectedUserIds = users.map((user) => user.id);
    await Promise.all(selectedUserIds.map((id) => deleteDeletedUser(id)));
  
    setDeletedUsers(
      deletedUsers.filter((user) => !selectedUserIds.includes(user.id))
    );
  
    setSelectedUsers([]);
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setSelectedUsers([]);
    setShowDeleteModal(false);
  };

  const handleSelectUser = (user: User) => {
    const isSelected = selectedUsers.includes(user);
    if (isSelected) {
      setSelectedUsers(selectedUsers.filter((u) => u !== user));
    } else {
      setSelectedUsers([...selectedUsers, user]);
    }
  };

  const handleDeleteSelected = async () => {
    const selectedUserIds = selectedUsers.map((user) => user.id);
    await Promise.all(selectedUserIds.map((id) => deleteDeletedUser(id)));

    setDeletedUsers(
      deletedUsers.filter((user) => !selectedUserIds.includes(user.id))
    );

    setSelectedUsers([]);
  };

  const handleRestoreSelected = async () => {
    setShowRestoreModal(true);
  };

  const handleConfirmRestore = async () => {
    if (restoringUser) {
      await restoreDeletedUser(restoringUser.id);

      const updatedDeletedUsers = deletedUsers.filter(
        (user) => user.id !== restoringUser.id
      );

      setDeletedUsers(updatedDeletedUsers);
      setRestoringUser(null);
    }

    setSelectedUsers([]);
    setShowRestoreModal(false);
  };

  const handleCancelRestore = () => {
    setRestoringUser(null);
    setShowRestoreModal(false);
  };

  const handleSelectAll = () => {
    if (selectedUsers.length === deletedUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(deletedUsers);
    }
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
        {selectedUsers.length > 0 && (
          <Col>
            <Button
              variant="danger"
              onClick={handleDeleteSelected}
              className="btn-orange"
            >
              Delete Selected
            </Button>
            <Button
              variant="success"
              onClick={handleRestoreSelected}
              className="btn-purple"
            >
              Restore Selected
            </Button>
          </Col>
        )}
      </Row>
      <Row>
        <Col>
          <UserTable
            users={deletedUsers}
            selectedUsers={selectedUsers}
            onSelect={handleSelectUser}
            onRestore={handleRestore}
            onDelete={handleDelete}
            showRestoreButton={true}
            onSelectAll={handleSelectAll}
            onEdit={function (user: User): void {
              throw new Error("Function not implemented.");
            }}
          />
        </Col>
      </Row>
      <UserDeleteModal
        show={showDeleteModal}
        onHide={handleCloseModal}
        onSubmit={handleConfirmDelete}
        users={selectedUsers}
      />
      <UserRestoreModal
        show={showRestoreModal}
        onHide={handleCancelRestore}
        onSubmit={handleConfirmRestore}
        users={selectedUsers}
        restoringUser={restoringUser}
      />
    </Container>
  );
};

export default DeletedUsersPage;
