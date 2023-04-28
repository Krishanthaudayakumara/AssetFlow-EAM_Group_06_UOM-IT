import React, { useState } from 'react'
import { Form, Row } from 'react-bootstrap'
import AgentReport from './AgentReport'

interface ReportFilterProps {
  onReportTypeChange: (reportType: string) => void;
  onDateChange: (fromDate: string, toDate: string) => void;
}

const ReportFilter: React.FC<ReportFilterProps> = ({ onReportTypeChange, onDateChange }) => {
  const [reportType, setReportType] = useState<string>('')
  const [department, setDepartment] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');

  const handleReportTypeChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newReportType = event.target.value
    setReportType(newReportType)
    onReportTypeChange(newReportType)
  }

  const handleDepartmentChange = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    const newDepartment = event.target.value
    setDepartment(newDepartment)
  }
  const handleFromDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newFromDate = event.target.value;
    setFromDate(newFromDate);
    onDateChange(newFromDate, toDate);
  };

  const handleToDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newToDate = event.target.value;
    setToDate(newToDate);
    onDateChange(fromDate, newToDate);
  };


  const renderReportTypeOptions = () => {
    if (department === '1') {
      return (
        <>
          <option value="Agent">Agent</option>
          <option value="Support Ticket">Support Ticket</option>
        </>
      )
    } else if (department === '2') {
      return (
        <>
          <option value="Building">Building</option>
          <option value="Workstation">Workstation</option>
        </>
      )
    } else if (department === '3') {
      return (
        <>
          <option value="Stock">Stock</option>
          <option value="Category">Category</option>
        </>
      )
    } else {
      return null
    }
  }

  return (
    <Form className="form-horizontal" role="form">
      <Row>
        <div className="row">
          <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
            <label>Department Name:</label>
            <Form.Select
              aria-label="Default select example"
              onChange={handleDepartmentChange}
            >
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
              {renderReportTypeOptions()}
            </Form.Select>
          </div>
        </div>
      </Row>
      <Row>
        <div className="row">
          <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
            <Form.Group controlId="fromDate">
              <Form.Label>From Date</Form.Label>
              <Form.Control
                type="date"
                name="fromDate"
                value={fromDate}
                onChange={handleFromDateChange}
              />
            </Form.Group>
          </div>
        </div>
      </Row>
      <Row>
        <div className="row">
          <div className="col-md-8" style={{ margin: '5px 100px 0 0' }}>
            <Form.Group controlId="toDate">
              <Form.Label>To Date</Form.Label>
              <Form.Control
                type="date"
                name="toDate"
                value={toDate}
                onChange={handleToDateChange}
              />
            </Form.Group>
          </div>
        </div>
      </Row>
    </Form>
  )
}

export default ReportFilter

