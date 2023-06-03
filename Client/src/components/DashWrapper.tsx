import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { useLocation } from "react-router-dom";
import { height } from "@fortawesome/free-solid-svg-icons/faPen";

const isMobile = () => {
  return window.innerWidth < 768;
};

interface WrapperProps {
  theme: string;
  toggleTheme: () => void;
}

const Wrapper: React.FC<React.PropsWithChildren<WrapperProps>> = ({ children, theme, toggleTheme }) => {
  const match = useLocation().pathname;
  let active = match ? match.split("/")[1] : "";
  active = "/" + active;
  console.log(active);

  return (
    <Container fluid="xxl">
      <Row className="page-content">
        <Col className={`sidebar-col ${isMobile() ? "col-2" : "col-3"} `}>
          <div>
            <Sidebar active={active} theme={theme} />
          </div>
        </Col>
        <Col className={`content-col ${isMobile() ? "col-10" : "col-8"}`}>
          <div className="main-content">
            <Navbar theme={theme} toggleTheme={toggleTheme} />
            <div style={{ height: "5vh" }}></div>
            {children}
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Wrapper;
