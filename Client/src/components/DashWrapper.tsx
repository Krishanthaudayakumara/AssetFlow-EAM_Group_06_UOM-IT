import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";

const isMobile = () => {
  return window.innerWidth < 768;
};

const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  return (
    <Container>
      <Row>
        <Col className={`sidebar-col ${ isMobile() ? "col-2": "col-4"}`}>
          <div>
            <Sidebar active="/" />
          </div>
        </Col>
        <Col className={`content-col ${isMobile() ? "col-10": "col-8"}`}>
          <div>
            <Navbar />
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
