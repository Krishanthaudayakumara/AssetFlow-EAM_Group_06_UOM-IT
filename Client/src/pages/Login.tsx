import React, { useState } from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "../css/Login.css"; // import background image CSS file
import { BsArrowRightCircle } from "react-icons/bs";

const Login: React.FC = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:5087/api/Authentication/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });
      if (response.status === 200) {
        setIsValid(true);
        console.log(response.body);
        
      } else {
        setIsValid(false);
      }
    } catch (error) {
      console.error(error);
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
            {isValid === true && <p>Valid User</p>}
            {isValid === false && <p>Invalid User</p> }
            
          </Form>
        </Col>

      </Row>

    </Container>
  );
};

export default Login;
