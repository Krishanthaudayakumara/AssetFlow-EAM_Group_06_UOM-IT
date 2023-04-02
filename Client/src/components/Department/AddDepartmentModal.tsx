// AddDepartmentModal.tsx

import React, { useState } from "react";
import { Department } from "../../types";
import { Modal, Button } from "react-bootstrap";
import DepartmentForm from "./DepartmentForm";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (department: Department) => void;
}

const AddDepartmentModal: React.FC<Props> = ({
  show,
  onHide,
  onSubmit,
}) => {
  const [newDepartment, setNewDepartment] = useState<Partial<Department>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setNewDepartment({
      ...newDepartment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (): void => {
    onSubmit(newDepartment as Department);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DepartmentForm
          department={newDepartment}
          onChange={handleChange}
        />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-l-purple" onClick={onHide}>
          Close
        </Button>
        <Button className="btn-orange" onClick={handleSubmit}>
          Add Department
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddDepartmentModal;
