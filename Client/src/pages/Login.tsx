import React from "react";
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";
import "./css/Login.css"; // import background image CSS file
import { BsArrowRightCircle } from "react-icons/bs";

const Login: React.FC = () => {
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

        <Col lg={8}>
          <Image src={"/img/login-left.png"} className="login-left" />
          <h1>Efficient Asset Management Equals Success</h1>
        </Col>

        <Col lg={4}>
          <Form className="login-form">
            <Image src={"/img/logo.png"} className="logo" />

            <Form.Group controlId="formBasicEmail">
              <Form.Label>Email address</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>

            <Form.Group controlId="formBasicPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
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
            
          </Form>
        </Col>

      </Row>

    </Container>
  );
};

export default Login;
