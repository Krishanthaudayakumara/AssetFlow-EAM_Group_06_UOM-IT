import React, { useState, FormEvent } from "react";
import { Form, Button,Modal } from "react-bootstrap";
import axios from "axios";

function RequestForm() {
  const [subcategoryID, setSubcategoryID] = useState("");
  const [count, setCount] = useState("");
  const [showSuccessModal, setShowSuccessModal] = useState(false);


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Create an object with the form data
    const formData = {
      subcategoryID: subcategoryID,
      count: count,
    };

    try {
      // Send a POST request to the API endpoint using axios
      const response = await axios.post(
        "http://localhost:5087/api/Asset/request",
        formData
      );

      // Handle the response from the API
      console.log(response.data);
      setShowSuccessModal(true);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="subcategoryID">
        <Form.Label>Subcategory ID</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter subcategory ID"
          value={subcategoryID}
          onChange={(event) => setSubcategoryID(event.target.value)}
        />
      </Form.Group>

      <Form.Group controlId="Count">
        <Form.Label>Count</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter count"
          value={count}
          onChange={(event) => setCount(event.target.value)}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Request
      </Button>
    </Form>

    <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Your form has been submitted successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
  
}

export default RequestForm;
