// DepartmentModal.tsx

import React, { useState, useEffect } from "react";
import { Department } from "../../types";
import { Modal, Button } from "react-bootstrap";
import DepartmentForm from "./DepartmentForm";

interface Props {
  show: boolean;
  department: Department;
  onHide: () => void;
  onSubmit: (department: Department) => void;
}

const DepartmentModal: React.FC<Props> = ({
  show,
  department,
  onHide,
  onSubmit,
}) => {
  const [updatedDepartment, setUpdatedDepartment] = useState<Department>(
    department
  );

  useEffect(() => {
    setUpdatedDepartment(department);
  }, [department]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setUpdatedDepartment({
      ...updatedDepartment,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (): void => {
    onSubmit(updatedDepartment);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Department</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <DepartmentForm
          department={updatedDepartment}
          onChange={handleChange}
        />
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

export default DepartmentModal;
