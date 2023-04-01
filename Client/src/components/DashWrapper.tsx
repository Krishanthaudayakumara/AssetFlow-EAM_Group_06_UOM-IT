import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";

const isMobile = () => {
  return window.innerWidth < 768;
};

const Wrapper: React.FC<React.PropsWithChildren<{}>> = ({children}) => {
  const match = useLocation().pathname;
  let active = match ? match.split("/")[1] : "";
  active = "/" + active;
  console.log(active)

  return (
    <Container fluid="xxl">
      <Row className="page-content">
        <Col className={`sidebar-col ${ isMobile() ? "col-2": "col-3"}`}>
          <div>
            <Sidebar active={active} />
          </div>
        </Col>
        <Col className={`content-col ${isMobile() ? "col-10": "col-8"}`}>
          <div className="main-content">
            <Navbar />
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
