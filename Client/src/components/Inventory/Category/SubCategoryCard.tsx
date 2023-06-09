import React, { useState } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import '../../../css/Inventory/SubCategoryCard.css';

interface SubCategoryCardProps {
  subcategory: {
    id: number;
    name: string;
    imageUrl: string;
  };
  onDelete: (id: number) => void;
}

const SubCategoryCard: React.FC<SubCategoryCardProps> = ({ subcategory, onDelete }) => {
  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleDeleteClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirmDelete = () => {
    onDelete(subcategory.id);
    setShowConfirmation(false);
  };

  const handleCloseConfirmation = () => {
    setShowConfirmation(false);
  };

  return (
    <Card className="subcategory-card">
      <Card.Img variant="top" src={subcategory.imageUrl} />
      <Card.Body>
        <Card.Title>{subcategory.name}</Card.Title>
        <Button variant="danger" onClick={handleDeleteClick}>
          Delete
        </Button>
      </Card.Body>

      <Modal show={showConfirmation} onHide={handleCloseConfirmation}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this subcategory?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseConfirmation}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Card>
  );
};

export default SubCategoryCard;
