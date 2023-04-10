// DepartmentForm.tsx

import React from "react";
import { Department } from "../../types";
import { Form } from "react-bootstrap";

interface Props {
  department: Partial<Department>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const DepartmentForm: React.FC<Props> = ({ department, onChange }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="name">Department Name:</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="name"
          value={department.name || ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="description">Department Description:</Form.Label>
        <Form.Control
          as="textarea"
          id="description"
          name="description"
          value={department.description || ""}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default DepartmentForm;
