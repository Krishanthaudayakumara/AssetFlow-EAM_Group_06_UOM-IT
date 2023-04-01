import React, { useState } from 'react'
import { Form, Row,  Button } from 'react-bootstrap'

interface ReportFilterProps {
  onReportTypeChange: (reportType: string) => void
}

const ReportFilter: React.FC<ReportFilterProps> = ({ onReportTypeChange }) => {
  const [reportType, setReportType] = useState<string>('')

  const handleReportTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newReportType = event.target.value
    setReportType(newReportType)
    onReportTypeChange(newReportType)
  }

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
            <Form.Select
              aria-label="Default select example"
              onChange={handleReportTypeChange}
            >
              <option>Open this select menu</option>
              <option value="Agent">Agent</option>
              <option value="Support Ticket">Support Ticket</option>
            </Form.Select>
          </div>
        </div>
      </Row>
      <Row>
        <div className="row">
          <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
            <Form.Group controlId="dob">
              <div className="col-sm-15">
                <Form.Label>From Date</Form.Label>
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
     </Form>
  )
}

export default ReportFilter
