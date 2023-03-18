import React from 'react'
import { Form, Row, Col, Button } from 'react-bootstrap'

const ReportFilter: React.FC = () => {
  return (
    <Form className="form-horizontal" role="form">
      <Row>
      <div className="row">
      <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
          
          <label>Department Name:</label>
            
          <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">IT Support</option>
          <option value="2">Facility</option>
          <option value="3">Inventory</option>
          </Form.Select>
        </div>
        </div>
        </Row>
        <Row>
        <div className="row">
        <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
            <label>Report Type:</label>
            
          <Form.Select aria-label="Default select example">
          <option>Open this select menu</option>
          <option value="1">Agent</option>
          <option value="2">Support Ticket</option>
          <option value="3">Three</option>
      </Form.Select>
      </div>
      </div>
      </Row>
        <Row>
          <div className="row">
            <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
              <Form.Group controlId="dob">
                <div className="col-sm-15">
                  <Form.Label >From Date</Form.Label>
                </div>
                <div className="col-sm-15">
                  <Form.Control
                    type="date"
                    name="dob"
                    placeholder="Date of Birth"
                  />
                </div>
              </Form.Group>
            </div>
          </div>
        </Row>
        <Row>
          <div className="row">
            <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
              <Form.Group controlId="dob">
                <Form.Label>To Date</Form.Label>
                <Form.Control
                  type="date"
                  name="dob"
                  placeholder="Date of Birth"
                />
              </Form.Group>
            </div>
          </div>
        </Row>
        <Row>
        <div className='col-8' style={{padding:"7px 100px 0 15px"}}>
        <Button  variant="outline-primary"type="button"style={{ backgroundColor: "white" ,borderColor: "#331c7a",color: "#331c7a"}} >Generate Report</Button>
        </div>
        </Row>
      
    </Form>
  )
}

export default ReportFilter
