import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function AddSubCategory() {
  const [categoryProduct, setCategoryProduct] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  const [validationError, setValidationError] = useState("");


  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const categoryProduct = await axios.get("http://localhost:5087/api/Category");
      console.log(categoryProduct);
      setCategoryProduct(categoryProduct.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCategoryIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedCategoryId(event.target.value);
  };

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const subCategoryType = event.currentTarget.subCategoryType.value;
    const categoryType = selectedCategoryId;

      // Validate the inputs
      if (!subCategoryType||categoryType=="Choose a category ..." || !categoryType) {
        setValidationError("Please fill in all required fields.");
        return;
      }

     
 

      const data = {
        subCategoryType: subCategoryType,
        categoryType: categoryType,
      };


    try {
      const response = await axios.post("http://localhost:5087/api/SubCategory", data);
      console.log(response);
      handleClose(); // close the modal
      window.location.reload(); // reload the page
    } catch (error) {
      console.log(error);
    }
  };

  

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add SubCategory
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add SubCategory</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {validationError && (
            <Alert variant="danger">{validationError}</Alert>
          )}
    
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>SubCategory Type</Form.Label>
              <Form.Control type="text" name="subCategoryType" placeholder="Enter sub category type" 
              required/>
            </Form.Group>

            <Form.Group>
              <Form.Label>Category</Form.Label>
              <Form.Control as="select" name="categoryId" value={selectedCategoryId} onChange={handleCategoryIdChange} required>
                <option>Choose a category ...</option>
                {categoryProduct.map((category) => (
                  <option key={category.categoryType} value={category.categoryType}>{category.categoryType}</option>
                ))}
              </Form.Control>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddSubCategory;
