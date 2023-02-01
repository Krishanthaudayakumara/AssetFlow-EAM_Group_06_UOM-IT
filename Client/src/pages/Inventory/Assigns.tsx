import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MyNavbar from "../../components/Navbar";
import AssignsTable from "../../components/Inventory/AssignsTable";

const Assigns: React.FC = () => {
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
              <MyNavbar />
  
              <AssignsTable/>
            </div>
          </Col>
        </Row>
      </Container>
    );
  };
  
  export default Assigns;