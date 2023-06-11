import React, { useState, useEffect } from "react";
import { Container, Button, Row, Col } from "react-bootstrap";
import SubCategoryCard from "../../../components/Inventory/Category/SubCategoryCard";
import {
  getSubCategories,
  deleteSubCategory,
  createSubCategory,
} from "../../../api/subCategoryApi";
import SubCategoryModal from "../../../components/Inventory/Category/SubCategoryModal";
import "../../../css/Table.css";

const SubCategoryPage: React.FC = () => {
  const [subcategories, setSubcategories] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await getSubCategories();
      setSubcategories(response.data);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
    }
  };

  const handleDeleteSubCategory = async (id: number) => {
    try {
      await deleteSubCategory(id);
      fetchSubCategories();
    } catch (error) {
      console.error("Failed to delete subcategory:", error);
    }
  };

  const handleAddSubCategory = async (subcategory: {
    name: string;
    image: File;
    categoryId: number;
  }) => {
    try {
      await createSubCategory(subcategory);
      setShowModal(false);
      fetchSubCategories();
    } catch (error) {
      console.error("Failed to add subcategory:", error);
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="table-page-heading">SUBCATEGORIES</h2>
        </Col>
        <Col md={3}>
          <Button variant="primary" onClick={() => setShowModal(true)}>
            {" "}
            Add Subcategory
          </Button>
        </Col>
      </Row>
      <Row>
        {subcategories.map((subcategory: any) => (
          <Col key={subcategory.id} md={4}>
            <SubCategoryCard
              key={subcategory.id}
              subcategory={subcategory}
              onDelete={handleDeleteSubCategory}
            />
          </Col>
        ))}
      </Row>

      <SubCategoryModal
        show={showModal}
        onClose={() => setShowModal(false)}
        onSave={handleAddSubCategory}
      />
    </Container>
  );
};

export default SubCategoryPage;
