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

        <div>
          
        </div>
      
     
        <div>
         
          <SupportButton/>
          <br/>
          <hr style={{margin:'0 0 0 250px',color:'blue'}}/>
          <AgentTable/>          
        </div>
      
    </Row>
    <Chatbot/>
  </Container>
  );
};

export default Support_Agent;