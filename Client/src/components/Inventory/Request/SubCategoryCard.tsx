// CardComponent.tsx

import React from 'react';
import { Card } from 'react-bootstrap';

interface SubCategory {
    id: number;
    name: string;
  }

interface CardComponentProps {
    subCategories:  SubCategory[];
}

const SubCategoryCard: React.FC<CardComponentProps> = ({ subCategories }) => {
  return (
    <div className="card-container">
      {subCategories.map((subCategorie) => (
        <Card key={subCategorie.id}>
          <Card.Body>
            <Card.Title>{subCategorie.name}</Card.Title>
          </Card.Body>
        </Card>
      ))}
    </div>
  );
};

export default SubCategoryCard;
