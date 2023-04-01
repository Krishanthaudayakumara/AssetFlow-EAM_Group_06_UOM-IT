// EmployeeForm.tsx

import React from "react";
import { Employee } from "../../types";
import { Form } from "react-bootstrap";

interface Props {
  employee: Partial<Employee>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeForm: React.FC<Props> = ({ employee, onChange }) => {
  return (
    <Form>
      <Form.Group>
        <Form.Label htmlFor="firstName">First Name:</Form.Label>
        <Form.Control
          type="text"
          id="firstName"
          name="firstName"
          value={employee.firstName || ""}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="lastName">Last Name:</Form.Label>
        <Form.Control
          type="text"
          id="lastName"
          name="lastName"
          value={employee.lastName || ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="middleName">Middle Name:</Form.Label>
        <Form.Control
          type="text"
          id="middleName"
          name="middleName"
          value={employee.middleName || ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="email">Email:</Form.Label>
        <Form.Control
          type="email"
          id="email"
          name="email"
          value={employee.email || ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="phoneNumber">Phone Number:</Form.Label>
        <Form.Control
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          value={employee.phoneNumber || ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="dateOfBirth">Date of Birth:</Form.Label>
        <Form.Control
          type="date"
          id="dateOfBirth"
          name="dateOfBirth"
          value={employee.dateOfBirth ? employee.dateOfBirth.split("T")[0] : ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="hireDate">Hire Date:</Form.Label>
        <Form.Control
          type="date"
          id="hireDate"
          name="hireDate"
          value={employee.hireDate ? employee.hireDate.split("T")[0] : ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="jobTitle">Job Title:</Form.Label>
        <Form.Control
          type="text"
          id="jobTitle"
          name="jobTitle"
          value={employee.jobTitle || ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="departmentId">Department ID:</Form.Label>
        <Form.Control
          type="number"
          id="departmentId"
          name="departmentId"
          value={employee.departmentId || ""}
          onChange={onChange}
        />
      </Form.Group>
      <Form.Group>
        <Form.Label htmlFor="userName">Username:</Form.Label>
        <Form.Control
          type="text"
          id="userName"
          name="userName"
          value={employee.userName || ""}
          onChange={onChange}
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <Form.Control
          type="password"
          id="password"
          name="password"
          value={employee.password || ""}
          onChange={onChange}
        />
      </Form.Group>
    </Form>
  );
};

export default EmployeeForm;
