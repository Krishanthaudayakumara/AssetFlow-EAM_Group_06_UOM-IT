// EmployeeModal.tsx

import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import { Employee } from "../../types"; 

interface Props {
  show: boolean;
  employee: Employee;
  onHide: () => void;
  onSubmit: (employee: Employee) => void;
}

const EmployeeModal: React.FC<Props> = ({ show, employee, onHide, onSubmit }) => {
  const [editedEmployee, setEditedEmployee] = useState<Employee>(employee);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedEmployee({
      ...editedEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    onSubmit(editedEmployee);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <EmployeeForm employee={editedEmployee} onChange={handleChange} />
      </Modal.Body>
      <Modal.Footer>
        <Button className="btn-l-purple" onClick={onHide}>
          Close
        </Button>
        <Button className="btn-orange" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EmployeeModal;
