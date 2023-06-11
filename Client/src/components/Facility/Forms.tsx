
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Modal } from "react-bootstrap";
import axios from "axios";

interface BuildingData {
  buildingName: string;
  floorNo: number;
  address: string;
}

function Forms() {
  const [formData, setFormData] = useState<BuildingData>({
    buildingName: "",
    floorNo: 0,
    address: ""
  });
  const [showModal, setShowModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    try {
      const response = await axios.post(
        "http://localhost:5087/api/Building",
        formData
      );
      console.log("form data", formData);
      console.log(response.data);
      // Reset the form after successful submission
      setFormData({
        buildingName: "",
        floorNo: 0,
        address: ""
      });
      setShowModal(true);
      setErrorMessage(""); // Clear any previous error message
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Building with the same name, floor number, and address already exists.");
      }
    }
  };
  
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
      {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
        <Form.Group controlId="buildingName">
          <Form.Label>Building Name</Form.Label>
          <Form.Control
            type="text"
            name="buildingName"
            value={formData.buildingName}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="floorNo">
          <Form.Label>Floor Count</Form.Label>
          <Form.Control
            type="number"
            name="floorNo"
            value={formData.floorNo}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Form.Group controlId="address">
          <Form.Label>Address</Form.Label>
          <Form.Control
            type="text"
            name="address"
            value={formData.address}
            onChange={handleInputChange}
            required
          />
        </Form.Group>

        <Button variant="success" type="submit">
          Add a new building
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Data saved successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Forms;
