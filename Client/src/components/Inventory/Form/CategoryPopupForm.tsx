import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";

function AddCategory() {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [validationError, setValidationError] = useState("");

  const handleClose = () => {
    setShow(false);
    setValidationError("");
  };

  const handleShow = () => setShow(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Perform client-side validation
    const categoryType = event.currentTarget.categoryType.value;
    const description = event.currentTarget.description.value;

    if (!categoryType || !description) {
      setValidationError("Please fill in all the fields");
      return;
    }

    if(selectedImage==null){
      setValidationError("Please Choose A Image");
      return;
    }

    const data = new FormData();
    data.append("categoryType", categoryType);
    data.append("description", description);
    if (selectedImage) {
      data.append("image", selectedImage);
    }

    try {
      const response = await axios.post(
        "http://localhost:5087/api/Category",
        data
      );
      console.log(response);
      handleClose(); // close the modal
      window.location.reload(); // reload the page
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
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Category
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Category</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {validationError && (
              <Alert variant="danger">{validationError}</Alert>
            )}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Category Type</Form.Label>
              <Form.Control
                type="text"
                name="categoryType"
                placeholder="Enter category type"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                placeholder="Enter description"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image</Form.Label>
              <Form.Control
                type="file"
                name="image"
                accept="image/*"
                onChange={handleImageChange}
              />
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

export default AddCategory;
