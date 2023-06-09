import React from "react";
import { Form, Button } from "react-bootstrap";
import { Supplier } from "../../types";

interface Props {
  supplier: Partial<Supplier>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>, supplier: Partial<Supplier>) => void;
}

const SupplierForm: React.FC<Props> = ({ supplier, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const email = formData.get("email") as string;
    const notes = formData.get("notes") as string;
    onSubmit(e, { ...supplier, name, address, contactNumber, email, notes });
  };

  return (
    <Form id="supplierForm" onSubmit={handleSubmit}>
      <Form.Group>
        <Form.Label htmlFor="name">Name:</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          value={supplier.name || ""}
          onChange={() => {}}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="address">Address:</Form.Label>
        <Form.Control
          type="text"
          id="address"
          name="address"
          value={supplier.address || ""}
          onChange={() => {}}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="contactNumber">Contact Number:</Form.Label>
        <Form.Control
          type="tel"
          id="contactNumber"
          name="contactNumber"
          value={supplier.contactNumber || ""}
          onChange={() => {}}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control
          type="email"
          id="email"
          name="email"
          value={supplier.email || ""}
          onChange={() => {}}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="notes">Notes:</Form.Label>
        <Form.Control
          as="textarea"
          id="notes"
          name="notes"
          value={supplier.notes || ""}
          onChange={() => {}}
        />
      </Form.Group>
    </Form>
  );
};

export default SupplierForm;
