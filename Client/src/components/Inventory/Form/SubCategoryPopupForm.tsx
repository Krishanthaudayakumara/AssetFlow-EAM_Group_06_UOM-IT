import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddSubCategory() {
  const [categoryProduct, setCategoryProduct] = useState<any[]>([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("https://localhost:7272/api/Category");
      setCategoryProduct(response.data);
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
    const data = {
      subCategoryType: event.currentTarget.subCategoryType.value,
      categoryId: selectedCategoryId,
    };
    try {
      const response = await axios.post("https://localhost:7272/api/SubCategory", data);
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
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>SubCategory Type</Form.Label>
              <Form.Control type="text" name="subCategoryType" placeholder="Enter sub category type(int error)" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category id</Form.Label>
              <Form.Control type="text" name="categoryId" placeholder="Enter category Id" value={selectedCategoryId} onChange={handleCategoryIdChange} />
              <Form.Text className="text-muted">
                Select a category id from the drop-down or enter it manually.
              </Form.Text>
              <Form.Control as="select" name="categoryId" onChange={(e) => setSelectedCategoryId(e.target.value)}>
                <option>Select a category id</option>
                {categoryProduct.map((category) => (
                  <option key={category.categoryId} value={category.categoryId}>{category.categoryName}</option>
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
