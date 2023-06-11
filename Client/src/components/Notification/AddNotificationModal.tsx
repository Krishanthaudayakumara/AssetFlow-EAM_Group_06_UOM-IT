import React, { useState, useEffect } from "react";
import { Button, Card, Container, Form, ListGroup, Modal } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import axios from "axios";

interface Notification {
  id: number;
  title: string;
  message: string;
  imageUrl: string;
  createdAt: string;
}

interface AddNotificationModalProps {
    show: boolean;
    onClose: () => void;
    onAdd: (notification: Notification) => void;
  }
  

  const AddNotificationModal: React.FC<AddNotificationModalProps> = ({ show, onClose, onAdd }) => {
    const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [imageFile, setImageFile] = useState<File | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setImageFile(file || null);
  };

  const addNotification = async () => {
    try {
      if (!title || !message || !imageFile) {
        return;
      }

      const formData = new FormData();
      formData.append("Title", title);
      formData.append("Message", message);
      formData.append("Image", imageFile);

      const response = await axios.post(
        "http://localhost:5087/api/Notifications",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Notification</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Title</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Message</Form.Label>
            <Form.Control
              as="textarea"
              placeholder="Enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control type="file" onChange={handleImageChange} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={addNotification}>
          Add
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddNotificationModal;