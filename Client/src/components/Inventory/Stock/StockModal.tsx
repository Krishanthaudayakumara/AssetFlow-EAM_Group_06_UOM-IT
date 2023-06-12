// StockModal.jsx
import React, { useState, useEffect, ChangeEvent } from "react";
import { createStock } from "../../../api/stockApi";
import { Modal, Form, Button, Alert } from "react-bootstrap";

const StockModal = () => {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    categoryId: "",
    subCategoryId: 0,
    supplierId: 0,
    quantity: 0,
    cost: 0,
    arrivalDate: "",
    image: null as File | null,
  });
  const [error, setError] = useState("");

  const [categories, setCategories] = useState<{ id: number; name: string }[]>(
    []
  );
  const [subCategories, setSubCategories] = useState<
    { id: number; name: string }[]
  >([]);
  const [suppliers, setSuppliers] = useState<{ id: number; name: string }[]>(
    []
  );

  useEffect(() => {
    // Fetch categories when the component mounts
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      // Make an API call to fetch the categories
      const response = await fetch("http://localhost:5087/api/Category");
      const data = await response.json();
      setCategories(data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    // Fetch subcategories when the component mounts
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      // Make an API call to fetch the subcategories
      const response = await fetch("http://localhost:5087/api/SubCategory");
      const data = await response.json();
      setSubCategories(data);
    } catch (error) {
      console.error("Error fetching subcategories:", error);
    }
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = async () => {
    try {
      const response = await fetch("http://localhost:5087/api/Suppliers");
      const data = await response.json();
      setSuppliers(data);
    } catch (error) {
      console.error("Error fetching suppliers:", error);
    }
  };

  const handleClose = () => {
    setShow(false);
    setError("");
  };

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
        categoryId: "",
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
      setError("An error occurred while creating the stock.");
    }

    window.location.reload();
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Stock
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Create Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
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
              <Form.Label>Category :</Form.Label>
              <Form.Control
                as="select"
                id="categoryId"
                name="categoryId"
                value={formData.categoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Subcategory ID:</Form.Label>
              <Form.Control
                as="select"
                id="subCategoryId"
                name="subCategoryId"
                value={formData.subCategoryId}
                onChange={handleChange}
                required
              >
                <option value="">Select a subcategory</option>
                {subCategories.map((subcategory) => (
                  <option key={subcategory.id} value={subcategory.id}>
                    {subcategory.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Supplier ID:</Form.Label>
              <Form.Control
                as="select"
                id="supplierId"
                name="supplierId"
                value={formData.supplierId}
                onChange={handleChange}
                required
              >
                <option value="">Select a supplier</option>
                {suppliers.map((supplier) => (
                  <option key={supplier.id} value={supplier.id}>
                    {supplier.name}
                  </option>
                ))}
              </Form.Control>
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
              <Form.Label>Cost(Rs):</Form.Label>
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
