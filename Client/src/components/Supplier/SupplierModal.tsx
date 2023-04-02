import React from "react";
import { Modal, Button } from "react-bootstrap";
import SupplierForm from "./SupplierForm";
import { Supplier } from "../../types";

interface Props {
    show: boolean;
    onHide: () => void;
    supplier: Partial<Supplier>;
    onSubmit: (supplier: Supplier) => void;
  }
  

const SupplierModal: React.FC<Props> = ({ show, onHide, supplier, onSubmit }) => {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const name = formData.get("name") as string;
    const address = formData.get("address") as string;
    const contactNumber = formData.get("contactNumber") as string;
    const email = formData.get("email") as string;
    const notes = formData.get("notes") as string;
    onSubmit({ ...supplier, name, address, contactNumber, email, notes });
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{supplier ? "Edit" : "Add"} Supplier</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <SupplierForm supplier={supplier} onSubmit={handleSubmit} />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-l-purple" onClick={onHide}>
          Close
        </Button>
        <Button className="btn-orange" type="submit" form="supplierForm">
          {supplier ? "Update" : "Add"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default SupplierModal;
