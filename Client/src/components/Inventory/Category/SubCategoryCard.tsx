import React, { useState, useEffect } from 'react';
import { Card, Button, Modal } from 'react-bootstrap';
import '../../../css/Inventory/SubCategoryCard.css';
import axios from 'axios';

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
  const [categoryName, setCategoryName] = useState<any>('');



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


  useEffect(() => {
    fetchCategoryName();
  }, []);

  const fetchCategoryName = async () => {
    try {
      const response = await axios.get(`http://localhost:5087/api/Category/${subcategory.id}`);
      if (response.status === 200) {
        const category = response.data;
        setCategoryName(category.name);
      } else {
        console.error('Failed to fetch category name');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <Card className="subcategory-card">
      <Card.Img variant="top" src={subcategory.imageUrl} />
      <Card.Body>
        <Card.Title>{subcategory.name}</Card.Title>
        <Card.Title>{categoryName}</Card.Title>
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
