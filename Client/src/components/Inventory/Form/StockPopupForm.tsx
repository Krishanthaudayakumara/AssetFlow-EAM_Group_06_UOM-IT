import axios from "axios";
import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

function AddStock() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      subCategoryId: event.currentTarget.subCategoryId.value,
      purchasedDate: event.currentTarget.purchasedDate.value,
      cost: event.currentTarget.cost.value,
      warrantyExpiring: event.currentTarget.warrantyExpiring.value,
      supplierId: event.currentTarget.supplierId.value,
      amount: event.currentTarget.amount.value,

 
    };
    try {
      const response = await axios.post("https://localhost:7272/api/Stock", data);
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
        Add Stock
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>SubCategoryId</Form.Label>
              <Form.Control type="text" name="subCategoryId" placeholder="Enter subcategory id" />
            </Form.Group>

            <Form.Group>
              <Form.Label>PurchasedDate</Form.Label>
              <Form.Control type="text" name="purchasedDate" placeholder="Enter purchase date" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cost</Form.Label>
              <Form.Control type="text" name="cost" placeholder="Enter cost" />
            </Form.Group>

            <Form.Group>
              <Form.Label>WarrantyExpiring</Form.Label>
              <Form.Control type="text" name="warrantyExpiring" placeholder="Enter warranty expiring" />
            </Form.Group>

            <Form.Group>
              <Form.Label>SupplierId</Form.Label>
              <Form.Control type="text" name="supplierId" placeholder="Enter supplier id" />
            </Form.Group>

            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" name="amount" placeholder="Enter amount" />
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

export default AddStock;
