import React, { useState, useEffect } from "react";
import { Container, Row, Col, Nav, Table, Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolder, faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../Table/CategoryTable.css";
import { Link } from "react-router-dom";

function CategoryTable() {
  const [categoryProduct, setCategoryProduct] = useState<any[]>([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editCategoryId, setEditCategoryId] = useState<number | null>(null);
  const [updatedCategoryType, setUpdatedCategoryType] = useState("");
  const [updatedDescription, setUpdatedDescription] = useState("");
  const [selectedImage, setSelectedImage] = useState<File | null>(null);

  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteCategoryId, setDeleteCategoryId] = useState<number | null>(null);

  const [validationError, setValidationError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5087/api/Category");
      setCategoryProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (categoryId: number) => {
    // Get the category to edit
    const categoryToEdit = categoryProduct.find(
      (category) => category.id === categoryId
    );

    // Set the values for the modal inputs
    setUpdatedCategoryType(categoryToEdit?.categoryType || "");
    setUpdatedDescription(categoryToEdit?.description || "");
    setSelectedImage(null); // Reset the selected image

    // Show the edit modal
    setEditCategoryId(categoryId);
    setEditModalShow(true);
  };

  const handleSaveEdit = async () => {
    if (!updatedCategoryType || !updatedDescription) {
      setValidationError("Category type and description are required.");
      return;
    }

    if (selectedImage === null) {
      setValidationError("Please choose an image.");
      return;
    }

    try {
      const updatedCategory = new FormData();
      updatedCategory.append("categoryType", updatedCategoryType);
      updatedCategory.append("description", updatedDescription);
      if (selectedImage) {
        updatedCategory.append("image", selectedImage);
      }

      // Make the PUT request to update the category
      const response = await axios.put(
        `http://localhost:5087/api/Category/${editCategoryId}`,
        updatedCategory
      );
      console.log(response);
      fetchCategories(); // update the categories list
      setEditModalShow(false); // close the edit modal
      setValidationError(null);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (categoryId: number | null) => {
    // Check if the category ID exists in the categoryProduct state
    const categoryToDelete = categoryProduct.find(
      (category) => category.id === categoryId
    );
    if (!categoryToDelete) {
      console.log(`Category ID ${categoryId} does not exist`);
      return;
    }

    try {
      const response = await axios.delete(
        `http://localhost:5087/api/Category/${categoryId}`
      );
      console.log(response);
      fetchCategories(); // update the categories list
    } catch (error) {
      console.log(error);
    }
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };
  

  return (
    <div>
      <p
        style={{
          margin: "30px 0 30px 70px",
          color: "#482890",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Latest Categories
      </p>
      <div
        className="shadow p-3 rounded"
        style={{ margin: "30px 0 0 0px", backgroundColor: "#Fbf3F3" }}
      >
        {categoryProduct && categoryProduct.length > 0 ? (
          <Row>
            {categoryProduct.map((category) => (
              <Col key={category.id} md={4}>
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <p>{category.categoryType}</p>
                      {category.imageData && (
                        <img
                          className="img"
                          src={`data:${category.imageContentType};base64,${category.imageData}`}
                          alt="Category Image"
                        />
                      )}
                    </div>
                    <div className="flip-card-back">
                      <div>
                        <p className="typeName">{category.categoryType}</p>
                        <p className="description">{category.description}</p>
                        <p>
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: "482890", cursor: "pointer" }}
                            onClick={() => handleEdit(category.id)}
                          />
                          &nbsp; &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "#FF615A", cursor: "pointer" }}
                            onClick={() => {
                              setDeleteCategoryId(category.id);
                              setDeleteModalShow(true);
                            }}
                          />
                        </p>
                        <p>          {/* Add SubCategory button */}
                        <Link to="/subcategory">
                          <Button variant="primary">
                            <FontAwesomeIcon icon={faFolder} style={{ marginRight: "5px" }} />
                            SubCategory
                          </Button>
                        </Link>
                    </p>
                      </div>
                       

                    </div>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        ) : (
          <p>No data available</p>
        )}
      </div>

      <Modal show={editModalShow} onHide={() => setEditModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {validationError && <Alert variant="danger">{validationError}</Alert>}
          <Form>
            <Form.Group>
              <Form.Label>Category Type</Form.Label>
              <Form.Control
                type="text"
                value={updatedCategoryType}
                onChange={(e) => setUpdatedCategoryType(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                value={updatedDescription}
                onChange={(e) => setUpdatedDescription(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                accept="image/*"
                onChange={handleImageChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setEditModalShow(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={deleteModalShow} onHide={() => setDeleteModalShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to delete this category?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalShow(false)}>
            Close
          </Button>
          <Button variant="danger" onClick={() => handleDelete(deleteCategoryId)}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CategoryTable;
