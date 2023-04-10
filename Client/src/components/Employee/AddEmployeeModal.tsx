// AddEmployeeModal.tsx

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import { Employee } from "../../types";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (employee: Employee) => void;
}

const AddEmployeeModal: React.FC<Props> = ({ show, onHide, onSubmit }) => {
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(newEmployee as Employee);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployeeForm employee={newEmployee} onChange={handleChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-l-purple" onClick={onHide}>
          Close
        </Button>
        <Button className="btn-orange" onClick={handleSubmit}>
          Add Employee
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AddEmployeeModal;
