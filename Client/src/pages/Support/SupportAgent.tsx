import React from 'react';
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import AgentTable from '../../components/Support/AgentTable';
import Sidebar from '../../components/Sidebar';
import MyNavbar from '../../components/Navbar';
import Chatbot from '../../components/Support/Chatbot';
import SupportButton from '../../components/Support/SupportButton';

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
          <SupportButton/>
          <br/>
          <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
          <AgentTable/>          
        </div>
      </Col>
    </Row>
    <Chatbot/>
  </Container>
  );
};

export default Support_Agent;