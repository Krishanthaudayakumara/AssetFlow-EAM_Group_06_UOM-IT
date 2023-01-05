import React from "react";
import { Container, Row, Col, Nav } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/Home.css"; // import background image CSS file

const Home: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col md={3} className="sidebar-col">
          <div>
            <Sidebar />
          </div>
        </Col>
        <Col md={9}>
          <div>
            <Navbar></Navbar>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Home;
