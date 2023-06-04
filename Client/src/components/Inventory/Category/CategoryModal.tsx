import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

interface CategoryModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (category: {
    name: string;
    description: string;
    image: File;
  }) => void;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  show,
  onClose,
  onSave,
}) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSave = () => {
    onSave({ name, description, image: image as File });
    setName("");
    setDescription("");
    setImage(null);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Category</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Description</Form.Label>
            <Form.Control
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Image</Form.Label>
            <Form.Control
              type="file"
              onChange={(e) => {
                const inputElement = e.target as HTMLInputElement;
                const file = inputElement.files && inputElement.files[0];
                setImage(file || null);
              }}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default CategoryModal;
