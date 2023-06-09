// EmployeeForm.tsx

import React, { useState } from "react";
import { Employee } from "../../types";
import { Form, Button, InputGroup } from "react-bootstrap";
import { FiEye, FiEyeOff, FiKey } from "react-icons/fi";

interface Props {
  employee: Partial<Employee>;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EmployeeForm: React.FC<Props> = ({ employee, onChange }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const generatePassword = () => {
    const length = 12; // Minimum password length
    const uppercaseChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lowercaseChars = 'abcdefghijklmnopqrstuvwxyz';
    const numberChars = '0123456789';
    const specialChars = '!@#$%^&*()-=_+[]{}|;:,.<>?';

    let password = '';
    let charSet = '';

    // Include at least one character from each character set
    password += getRandomCharFromSet(uppercaseChars);
    password += getRandomCharFromSet(lowercaseChars);
    password += getRandomCharFromSet(numberChars);
    password += getRandomCharFromSet(specialChars);

    // Generate remaining characters
    const remainingLength = length - password.length;
    charSet = uppercaseChars + lowercaseChars + numberChars + specialChars;
    for (let i = 0; i < remainingLength; i++) {
      password += getRandomCharFromSet(charSet);
    }

    setGeneratedPassword(password);
    onChange({
      target: {
        name: "password",
        value: password,
      },
    } as React.ChangeEvent<HTMLInputElement>);  };

  const getRandomCharFromSet = (charSet: string | any[]) => {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneratedPassword(e.target.value);
    onChange(e);
  };
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
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
          required
          
        />
      </Form.Group>

      <Form.Group>
        <Form.Label htmlFor="password">Password:</Form.Label>
        <InputGroup>
          <Form.Control
            type={passwordVisible ? "text" : "password"}
            id="password"
            name="password"
            value={generatedPassword || (employee ? employee.password : "")}
            onChange={handlePasswordChange}
            required
          />
          <Button
            variant="secondary"
            onClick={togglePasswordVisibility}
            className="toggle-password-visibility-btn"
          >
            {passwordVisible ? <FiEyeOff /> : <FiEye />}
          </Button>
          <Button
            variant="secondary"
            onClick={generatePassword}
            className="generate-password-btn"
          >
            <FiKey />
          </Button>
        </InputGroup>
      </Form.Group>
    </Form>
  );
};

export default EmployeeForm;
