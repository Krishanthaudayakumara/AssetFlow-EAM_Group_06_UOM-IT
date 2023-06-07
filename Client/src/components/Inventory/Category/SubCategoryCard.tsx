import React from 'react';
import { Card, Button } from 'react-bootstrap';
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
  const handleDeleteClick = () => {
    if (window.confirm('Are you sure you want to delete this subcategory?')) {
      onDelete(subcategory.id);
    }
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
    </Card>
  );
};

export default SubCategoryCard;
