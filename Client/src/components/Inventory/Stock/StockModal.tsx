// StockModal.jsx
import React, { useState, ChangeEvent } from "react";
import { createStock } from "../../../api/stockApi";
import { Modal, Form, Button } from "react-bootstrap";

const StockModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: 0,
    subCategoryId: 0,
    supplierId: 0,
    quantity: 0,
    cost: 0,
    arrivalDate: "",
    image: null as File | null,
  });

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    if (e.target.name === "image") {
      const inputElement = e.target as HTMLInputElement;
      const file = inputElement.files && inputElement.files[0];
      setFormData({
        ...formData,
        image: file || null,
      });
    } else {
      setFormData({
        ...formData,
        [e.target.name]: e.target.value,
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const imageFormData = new FormData();
      if (formData.image) {
        imageFormData.append("image", formData.image);
      }
      imageFormData.append("name", formData.name);
      imageFormData.append("description", formData.description);
      imageFormData.append("categoryId", formData.categoryId.toString());
      imageFormData.append("subCategoryId", formData.subCategoryId.toString());
      imageFormData.append("supplierId", formData.supplierId.toString());
      imageFormData.append("quantity", formData.quantity.toString());
      imageFormData.append("cost", formData.cost.toString());
      imageFormData.append("arrivalDate", formData.arrivalDate);

      await createStock(imageFormData);
      setFormData({
        name: "",
        description: "",
        categoryId: 0,
        subCategoryId: 0,
        supplierId: 0,
        quantity: 0,
        cost: 0,
        arrivalDate: "",
        image: null,
      });
      handleClose();
    } catch (error) {
      console.error("Error creating stock:", error);
    }
  };

  return (
    <>
      <Button variant="primary" className="btn-purple" onClick={handleShow}>
        Add Stock
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>Name:</Form.Label>
              <Form.Control
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Description:</Form.Label>
              <Form.Control
                as="textarea"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Category ID:</Form.Label>
              <Form.Control
                type="number"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Subcategory ID:</Form.Label>
              <Form.Control
                type="number"
                id="subCategoryId"
                name="subCategoryId"
                value={formData.subCategoryId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Supplier ID:</Form.Label>
              <Form.Control
                type="number"
                id="supplierId"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Quantity:</Form.Label>
              <Form.Control
                type="number"
                id="quantity"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cost:</Form.Label>
              <Form.Control
                type="number"
                id="cost"
                name="cost"
                value={formData.cost}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Image:</Form.Label>
              <Form.Control
                type="file"
                id="image"
                name="image"
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Arrival Date:</Form.Label>
              <Form.Control
                type="date"
                id="arrivalDate"
                name="arrivalDate"
                value={formData.arrivalDate}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit">
              Create
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default StockModal;
