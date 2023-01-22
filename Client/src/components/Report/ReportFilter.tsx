import React from 'react';
import Dropdown from 'react-bootstrap/Dropdown';
import { Form, Row, Col } from "react-bootstrap";


const ReportFilter: React.FC = () =>{
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
        <Col xs={{ order:12}}>
        <div className="row">
                    <div className="col-md-8"style={{margin:"5px 100px 0 0"}}>
                        <Form.Group controlId="dob">
                            <Form.Label>From Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                    </div>
          </Col> 
          <Col xs={{ order:12}}>
        <div className="row">
                    <div className="col-md-8"style={{margin:"5px 100px 0 0"}}>
                        <Form.Group controlId="dob">
                            <Form.Label>To Date</Form.Label>
                            <Form.Control type="date" name="dob" placeholder="Date of Birth" />
                        </Form.Group>
                    </div>
                    </div>
          </Col> 
          </Row>   
</Form>

  ); 
};

export default ReportFilter;