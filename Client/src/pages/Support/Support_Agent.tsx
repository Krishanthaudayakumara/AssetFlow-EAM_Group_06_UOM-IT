import React from 'react';
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Agent_Table from '../../components/Support/Agent_Table';
import Sidebar from '../../components/Sidebar';
import MyNavbar from '../../components/Navbar';
import Chatbot from '../../components/Support/Chatbot';


const Support_Agent: React.FC = () => {
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
          <Agent_Table/>          
        </div>
      </Col>
    </Row>
    <Chatbot/>
  </Container>
  );
};

export default Support_Agent;