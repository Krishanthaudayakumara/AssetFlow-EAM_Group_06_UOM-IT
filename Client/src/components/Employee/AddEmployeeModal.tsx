import React, { useState, useEffect } from "react";
import { Modal, Button, Alert, Spinner } from "react-bootstrap";
import EmployeeForm from "./EmployeeForm";
import { Employee } from "../../types";
import { AxiosError } from "axios";

interface Props {
  show: boolean;
  onHide: () => void;
  onSubmit: (employee: Employee) => void;
}

const AddEmployeeModal: React.FC<Props> = ({ show, onHide, onSubmit }) => {
  const [newEmployee, setNewEmployee] = useState<Partial<Employee>>({});
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (error) {
      timer = setTimeout(() => {
        setError(null);
      }, 4000);
    }

    return () => {
      if (timer) {
        clearTimeout(timer);
      }
    };
  }, [error]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setNewEmployee({
      ...newEmployee,
      [e.target.name]: e.target.value,
    });
  };

  const handleAlertClose = () => {
    setError(null);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setError(null);

    try {
      await onSubmit(newEmployee as Employee);
      setNewEmployee({});
      onHide(); // Remove this line to prevent the form from automatically closing
    } catch (error: unknown) {
      const axiosError = error as AxiosError;
      if (axiosError.isAxiosError && axiosError.response && axiosError.response.data) {
        setError("Error: " + axiosError.response.data);
      } else {
        setError("An error occurred while adding the employee");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add Employee</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && (
          <Alert variant="danger" onClose={handleAlertClose} dismissible>
            {error}
          </Alert>
        )}
        {isLoading ? (
          <div className="text-center">
            <Spinner animation="border" />
          </div>
        ) : (
          <EmployeeForm employee={newEmployee} onChange={handleChange} />
        )}
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
