import React, { useState } from "react";
import { Form, Button, InputGroup } from "react-bootstrap";
import { User, UserRole } from "../../types";
import { FiEye, FiEyeOff, FiKey } from "react-icons/fi";

interface Props {
  user?: Partial<User>;
  onSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
}

const UserForm: React.FC<Props> = ({ user = {}, onSubmit }) => {
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
  };
  
  const getRandomCharFromSet = (charSet: string | any[]) => {
    const randomIndex = Math.floor(Math.random() * charSet.length);
    return charSet[randomIndex];
  };

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setGeneratedPassword(e.target.value);
  };

  return (
    <Form id="userForm" onSubmit={onSubmit}>
      <Form.Group controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control
          type="email"
          name="email"
          defaultValue={user ? user.email : ""}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicUsername">
        <Form.Label>Username</Form.Label>
        <Form.Control
          type="text"
          name="username"
          defaultValue={user ? user.username : ""}
          required
        />
      </Form.Group>

      <Form.Group controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <InputGroup>
          <Form.Control
            type={passwordVisible ? "text" : "password"}
            name="password"
            value={generatedPassword || (user ? user.password : "")}
            required
          />
            <Button
              variant="primary"
              onClick={generatePassword}
              className="generate-password-btn"
            >
              <FiKey />
            </Button>
          <Button
            variant="secondary"
            onClick={togglePasswordVisibility}
            className="toggle-password-visibility-btn"
          >
            {passwordVisible ? <FiEyeOff /> : <FiEye />}
          </Button>
        </InputGroup>
      </Form.Group>

      <Form.Group controlId="formBasicRole">
        <Form.Label>Role</Form.Label>
        <Form.Control
          as="select"
          name="role"
          defaultValue={user ? user.role || UserRole.Employee : ""}
        >
          <option value={UserRole.Employee}>Employee</option>
          <option value={UserRole.Admin}>Admin</option>
        </Form.Control>
      </Form.Group>
    </Form>
  );
};

export default UserForm;
