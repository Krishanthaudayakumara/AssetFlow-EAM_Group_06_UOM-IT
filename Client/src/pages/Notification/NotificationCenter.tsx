import React, { useState, useEffect } from "react";
import { Button, Container, Form, ListGroup } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import axios from "axios";
import AddNotificationModal from "../../components/Notification/AddNotificationModal";
import DeleteNotificationModal from "../../components/Notification/DeleteNotificationModal";
import NotificationCard from "../../components/Notification/NotificationCard";

interface Notification {
    id: number;
    title: string;
    message: string;
    imageUrl: string;
    createdAt: string;
  }

  
const NotificationCenter: React.FC = () => {
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteNotificationId, setDeleteNotificationId] = useState<number | null>(null);
  
    useEffect(() => {
      // Fetch notifications from API
      const fetchNotifications = async () => {
        try {
          const response = await axios.get("http://localhost:5087/api/Notifications");
          setNotifications(response.data);
        } catch (error) {
          console.log(error);
        }
      };
  
      fetchNotifications();
    }, []);
  
    const openAddModal = () => {
      setShowAddModal(true);
    };
  
    const closeAddModal = () => {
      setShowAddModal(false);
    };
  
    const openDeleteModal = (id: number) => {
      setDeleteNotificationId(id);
      setShowDeleteModal(true);
    };
  
    const closeDeleteModal = () => {
      setShowDeleteModal(false);
    };
  
    const deleteNotification = async (id: number) => {
      try {
        // Perform deletion API request
        await axios.delete(`http://localhost:5087/api/Notifications/${id}`);
        setNotifications(notifications.filter((notification) => notification.id !== id));
      } catch (error) {
        console.log(error);
      }
    };
  
    const addNotification = (notification: Notification) => {
      setNotifications([...notifications, notification]);
      closeAddModal();
    };
  
    return (
      <Container>
        <Button variant="primary" onClick={openAddModal}>
          Add Notification
        </Button>
  
        <AddNotificationModal show={showAddModal} onClose={closeAddModal} onAdd={addNotification} />
  
        <DeleteNotificationModal
          show={showDeleteModal}
          onClose={closeDeleteModal}
          onDelete={() => deleteNotification(deleteNotificationId!)}
        />
  
        <ListGroup>
          {notifications.map((notification) => (
            <NotificationCard key={notification.id} notification={notification} onDelete={openDeleteModal} />
          ))}
        </ListGroup>
      </Container>
    );
  };
  
  export default NotificationCenter;