import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import CategoryCard from "../../../components/Inventory/Category/CategoryCard";
import CategoryModal from "../../../components/Inventory/Category/CategoryModal";
import {
  getCategories,
  addCategory,
  editCategory,
  deleteCategory,
} from "../../../api/categoryApi";
import { useNavigate } from "react-router";
import "../../../css/Table.css";

const CategoryPage: React.FC = () => {
  const history = useNavigate();

  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategoryId, setSelectedCategoryId] = useState<number | null>(
    null
  );

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Failed to fetch categories:", error);
    }
  };

  const handleAddCategory = async (category: {
    name: string;
    description: string;
    image: File;
  }) => {
    try {
      await addCategory(category);
      setShowModal(false);
      fetchCategories();
    } catch (error) {
      console.error("Failed to add category:", error);
    }
  };

  const handleEditCategory = async (category: {
    name: string;
    description: string;
    image: File;
  }) => {
    try {
      await editCategory({ id: selectedCategoryId!, ...category });
      setSelectedCategoryId(null);
      fetchCategories();
    } catch (error) {
      console.error("Failed to edit category:", error);
    }
  };

  const handleDeleteCategory = async (id: number) => {
    try {
      await deleteCategory(id);
      fetchCategories();
    } catch (error) {
      console.error("Failed to delete category:", error);
    }
  };

  const handleEditButtonClick = (id: number) => {
    setSelectedCategoryId(id);
    setShowModal(true);
  };

  const handleDeleteButtonClick = (id: number) => {
    if (window.confirm("Are you sure you want to delete this category?")) {
      handleDeleteCategory(id);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="table-page-heading">CATEGORIES</h2>
        </Col>
        <Col md={3}>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Category
          </Button>
        </Col>
      </Row>
      <Row>
        {categories.map((category: any) => (
          <Col key={category.id} md={4}>
            <CategoryCard
              category={category}
              onEdit={handleEditButtonClick}
              onDelete={handleDeleteButtonClick}
            />
          </Col>
        ))}
      </Row>
      <CategoryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={selectedCategoryId ? handleEditCategory : handleAddCategory}
      />
    </Container>
  );
};

export default CategoryPage;
