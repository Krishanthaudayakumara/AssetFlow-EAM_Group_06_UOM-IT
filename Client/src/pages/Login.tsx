import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "../css/Login.css"; // import background image CSS file
import { BsArrowRightCircle } from "react-icons/bs";
import { login } from "../services/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const data = await login(username, password);
      setIsValid(true);
      localStorage.setItem("token", data.token); // store the token in local storage
      navigate("/"); // redirect to home page
    } catch (e: any) {
      setIsValid(false);
      setError(e.message); // set the error message to display in the component
    }
  };

  const handleDeleteUser = async () => {
    const userId = "123"; // replace with the actual user ID
    try {
      const response = await fetch(
        `http://localhost:5087/api/auth/users/${userId}`,
        {
          method: "DELETE",
          headers: {
            accept: "application/json",
          },
        }
      );
      const data = await response.json();
      console.log(data);
      // handle successful deletion
    } catch (error) {
      console.error(error);
      // handle error
    }
  };

  return (
    <Container
      className="login-container"
      style={{
        backgroundImage: `url(/img/login-back.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Row className="justify-content-center">
        <Col lg={8} className="login-left-col">
          <Image src={"/img/login-left.png"} className="login-left" />
          <h1>Efficient Asset Management Equals Success</h1>
        </Col>

        <Col lg={4}>
          <Form className="login-form" onSubmit={handleSubmit}>
            <Image src={"/img/logo.png"} className="logo" />

            <Form.Group controlId="usernameForm">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Username"
                value={username}
                onChange={(event) => setUsername(event.target.value)}
              />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="submit-btn">
              Login{" "}
              <BsArrowRightCircle
                style={{
                  fontSize: "2.2rem",
                  marginRight: "-2rem",
                  marginLeft: "2rem",
                }}
              />
            </Button>
            {isLoading && <p>Loading...</p>}
            {error && <p>{error}</p>}
            {/* {isValid === true && <p>Invalid User</p>} */}
          </Form>
        
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
