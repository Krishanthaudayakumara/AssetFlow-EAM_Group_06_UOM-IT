import React from 'react';
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import BuildingFloor_table from '../components/Facility/BuildingFloor_table';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';

const BuildingFloor: React.FC = () => {
    return (
        <Container>
            <Row>
                <Col md={3} className="sidebar-col">
                    <div>
                        <Sidebar/>
                    </div>
                    
                </Col>
                <Col md={9} className="Navbar">
                    <div>
                        <Navbar/>
                        <BuildingFloor_table/>
                       
                    </div>
                </Col>
                                  
                                
            </Row>
        </Container>
           
    );
  };
  
  export default  BuildingFloor;
  