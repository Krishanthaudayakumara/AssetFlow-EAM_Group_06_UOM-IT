import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, ListGroup, Modal } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import axios from "axios";


const DeleteNotificationModal: React.FC<{ show: boolean; onClose: () => void; onDelete: () => void }> = ({
    show,
    onClose,
    onDelete,
  }) => {
    const deleteNotification = async () => {
      try {
        // Perform deletion API request
        onDelete();
        onClose();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <Modal show={show} onHide={onClose}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this notification?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={onClose}>
            Cancel
          </Button>
          <Button variant="danger" onClick={deleteNotification}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  export default DeleteNotificationModal;