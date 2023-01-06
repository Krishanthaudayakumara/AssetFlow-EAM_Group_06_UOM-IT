import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, Button, Container, Row, Col, Image } from "react-bootstrap";

const ReportFilter: React.FC = () => {
  return (
    
    <Form >
  
      <Row>
        <Col xs><Dropdown className="d-inline mx-2">
        <Dropdown.Toggle id="dropdown-autoclose-true">
        Departments
        </Dropdown.Toggle>

        < Dropdown.Menu>
        <Dropdown.Item href="#">IT Support</Dropdown.Item>
        <Dropdown.Item href="#">Facility</Dropdown.Item>
        <Dropdown.Item href="#">Inventory</Dropdown.Item>
        </Dropdown.Menu>
        </Dropdown>
        </Col>

        <Col xs={{ order: 12 }}>
        <Dropdown className="d-inline mx-2" autoClose="inside">
      <Dropdown.Toggle id="dropdown-autoclose-inside">
       From date
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">dd Item</Dropdown.Item>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

        </Col>
        <Col xs={{ order: 1 }}>

        <Dropdown className="d-inline mx-2" autoClose="outside">
      <Dropdown.Toggle id="dropdown-autoclose-outside">
       To Date
      </Dropdown.Toggle>

      <Dropdown.Menu>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
        <Dropdown.Item href="#">Menu Item</Dropdown.Item>
      </Dropdown.Menu>
    </Dropdown>

    
    </Col>
      </Row>
      
</Form>

  ); 
};

export default ReportFilter;