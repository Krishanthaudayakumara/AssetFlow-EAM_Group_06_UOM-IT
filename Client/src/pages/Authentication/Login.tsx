import React, { useState, useEffect } from "react";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Image,
  Alert,
  Card,
  Spinner,
} from "react-bootstrap";
import "../../css/Login.css";
import { BsArrowRightCircle } from "react-icons/bs";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { login } from "../../services/auth";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isValid, setIsValid] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/");
    }

    if (error) {
      const timer = setTimeout(() => {
        setError("");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [error]);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const data = await login(username, password);
      setIsValid(true);
      localStorage.setItem("token", data.token);
      navigate("/");
      window.location.reload();
    } catch (e: any) {
      setIsValid(false);
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container
      fluid="xxxl"
      className="login-container"
      style={{
        backgroundImage: `url(/img/login-back.png)`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
      }}
    >
      <Card
        className="login-card-back"
        style={{
          backgroundImage: `url(/img/grey-background.jpg)`,
          backgroundRepeat: "no-repeat",
        }}
      >
        <Card.Body>
          <Row className="justify-content-center">
            <Col lg={6} className="login-left-col">
              <Image src={"/img/login-left.png"} className="login-left" />
              <h1>Efficient Asset Management Equals Success...</h1>
            </Col>

            <Col lg={5}>
              <Card className="login-card">
                <Card.Body>
                  <Form className="login-form" onSubmit={handleSubmit}>
                    <Image src={"/img/logo.png"} className="logo" />
                    {error && (
                      <Alert variant="danger" className="mt-3">
                        {error}
                      </Alert>
                    )}

                    <Form.Group controlId="usernameForm">
                      <Form.Label>Username</Form.Label>
                      <Form.Control
                        type="text"
                        placeholder="Enter Username"
                        value={username}
                        onChange={(event) =>
                          setUsername(event.target.value)
                        }
                        className="login-form-control"
                      />
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Password</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(event) =>
                          setPassword(event.target.value)
                        }
                        className="login-form-control"
                      />
                    </Form.Group>

                    <Form.Group controlId="rememberMeForm">
                      <Form.Check
                        type="checkbox"
                        label="Remember me"
                      />
                    </Form.Group>

                    <Button
                      variant="primary"
                      type="submit"
                      className="submit-btn"
                    >
                      {isLoading ? (
                        <>
                          <Spinner
                            as="span"
                            animation="border"
                            size="sm"
                            role="status"
                            aria-hidden="true"
                          />
                          Loading...
                        </>
                      ) : (
                        <>
                          Login{" "}
                          <BsArrowRightCircle className="login-btn-icon" />
                        </>
                      )}
                    </Button>
                    <a href="">Forgot Password</a>
                  </Form>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Card.Body>
      </Card>{" "}
    </Container>
  );
};

export default Login;
