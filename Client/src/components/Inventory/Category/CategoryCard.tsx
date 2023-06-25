import React from "react";
import { Card, Button } from "react-bootstrap";
import "../../../css/Inventory/CategoryCard.css";
import { Link } from "react-router-dom";

interface CategoryCardProps {
  category: {
    id: number;
    name: string;
    description: string;
    imageUrl: string;
  };
  onEdit: (id: number) => void;
  onDelete: (id: number) => void;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  category,
  onEdit,
  onDelete,
}) => {
  return (
    <Card className="category-card">
      <Link to={`/categories/${category.id}`}>
        <Card.Img variant="top" src={category.imageUrl} />
        </Link>

        <Card.Body>
          <Card.Title>{category.name}</Card.Title>
          <Card.Text>{category.description}</Card.Text>
          <Button className="btn btn-outline-light" style={{ backgroundColor: "#482890" }} onClick={() => onEdit(category.id)}>
            Edit
          </Button>
          &nbsp;&nbsp;
          <Button className="btn btn-outline-light" style={{ backgroundColor: "#FF615A" }} onClick={() => onDelete(category.id)}>
            Delete
          </Button>
        </Card.Body>
    </Card>
  );
};

export default CategoryCard;
