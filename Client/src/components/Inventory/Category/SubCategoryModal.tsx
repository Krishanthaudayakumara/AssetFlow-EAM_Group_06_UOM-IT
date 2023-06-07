import React, { useState, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import { getCategories } from '../../../api/categoryApi';

interface SubCategoryModalProps {
  show: boolean;
  onClose: () => void;
  onSave: (subcategory: {
    name: string;
    image: File;
    categoryId: number;
  }) => void;
}

const SubCategoryModal: React.FC<SubCategoryModalProps> = ({ show, onClose, onSave }) => {
  const [name, setName] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [categoryId, setCategoryId] = useState<number>(0);
  const [categories, setCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error('Failed to fetch categories:', error);
    }
  };

  const handleSave = () => {
    onSave({ name, image: image as File, categoryId });
    setName('');
    setImage(null);
    setCategoryId(0);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Add Subcategory</Modal.Title>
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
          <Form.Group>
            <Form.Label>Category</Form.Label>
            <Form.Control
              as="select"
              value={categoryId}
              onChange={(e) => setCategoryId(Number(e.target.value))}
            >
              <option value={0}>Select a category</option>
              {categories.map((category: any) => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Control>
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

export default SubCategoryModal;
