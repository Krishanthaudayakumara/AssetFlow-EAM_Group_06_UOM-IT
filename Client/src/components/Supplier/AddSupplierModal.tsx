import React, { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { Supplier } from "../../types";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (supplier: Supplier) => void;
}

const AddSupplierModal: React.FC<Props> = ({ show, onHide, onSubmit }) => {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const supplier: Supplier = { name, address, contactNumber, email, notes };
    onSubmit(supplier);
    setName("");
    setAddress("");
    setContactNumber("");
    setEmail("");
    setNotes("");
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Supplier</Modal.Title>
      </Modal.Header>
      <Form onSubmit={handleSubmit}>
        <Modal.Body>
          <Form.Group>
            <Form.Label htmlFor="name">Name:</Form.Label>
            <Form.Control
              type="text"
              id="name"
              name="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="address">Address:</Form.Label>
            <Form.Control
              type="text"
              id="address"
              name="address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="contactNumber">Contact Number:</Form.Label>
            <Form.Control
              type="text"
              id="contactNumber"
              name="contactNumber"
              value={contactNumber}
              onChange={(e) => setContactNumber(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="email">Email:</Form.Label>
            <Form.Control
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label htmlFor="notes">Notes:</Form.Label>
            <Form.Control
              as="textarea"
              id="notes"
              name="notes"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button className="btn-l-purple" onClick={onHide}>
            Cancel
          </Button>
          <Button className="btn-orange" type="submit">
            Add Supplier
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
};

export default AddSupplierModal;
