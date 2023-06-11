import React, { useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { ExternalWorker } from "../../types";

interface ExternalWorkerFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: ExternalWorker) => void;
  initialData?: ExternalWorker | null;
}

const ExternalWorkerFormModal: React.FC<ExternalWorkerFormModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
}) => {
  const [formData, setFormData] = useState<ExternalWorker>(
    initialData || {
      id: 0, // Provide a default or optional value for the 'id' property
      firstName: '',
      lastName: '',
      middleName: '',
      phoneNumber: '',
      dateOfBirth: '',
      hireDate: '',
      jobTitle: '',
      departmentId: 1,
    }
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData: any) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Modal show={isOpen} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>{initialData ? 'Edit External Worker' : 'Add External Worker'}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="firstName">
            <Form.Label>First Name</Form.Label>
            <Form.Control
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="lastName">
            <Form.Label>Last Name</Form.Label>
            <Form.Control
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="middleName">
            <Form.Label>Middle Name</Form.Label>
            <Form.Control
              type="text"
              name="middleName"
              value={formData.middleName}
              onChange={handleChange}
            />
          </Form.Group>
          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              type="text"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="dateOfBirth">
            <Form.Label>Date of Birth</Form.Label>
            <Form.Control
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="hireDate">
            <Form.Label>Hire Date</Form.Label>
            <Form.Control
              type="date"
              name="hireDate"
              value={formData.hireDate}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="jobTitle">
            <Form.Label>Job Title</Form.Label>
            <Form.Control
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit">
            Save
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default ExternalWorkerFormModal;
