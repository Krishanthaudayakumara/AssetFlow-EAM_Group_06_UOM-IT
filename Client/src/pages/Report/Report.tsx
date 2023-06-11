import React, { useState, forwardRef, useImperativeHandle, useRef } from 'react';
import { Container } from 'react-bootstrap'
import ReportFilter from '../../components/Report/ReportFilter'
import '../../css/Home.css'
import ReportButton from '../../components/Report/ReportButton'
import AgentReport from '../../components/Report/AgentReport'
import TicketReport from '../../components/Report/TicketReport'
import BuildingReport from '../../components/Report/BuildingReport';
import AssetAssignmentReport from '../../components/Report/AssetAssignmentReport';
import WarrantyExpirationReport from '../../components/Report/WarrantyExpirationReport';
import "./../../css/Table.css";

const Report: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('')
  const [fromDate, setFromDate] = useState<string>('');
  const [toDate, setToDate] = useState<string>('');
  const [departmentName, setDepartmentName] = useState<string>('');
  const tableRef = useRef<any>(null);


  const handleReportTypeChange = (reportType: string) => {
    setSelectedReportType(reportType)
  }
  const handleDateChange = (newFromDate: string, newToDate: string) => {
    setFromDate(newFromDate);
    setToDate(newToDate);
  };
  const handleDepartmentChange = (department: string) => {
    setDepartmentName(department);
  };
  const handleSelectedReportTypeChange = (selectedReportType: string) => {
    setSelectedReportType(selectedReportType);
  };

  const renderTable = () => {
    // ...
  
    return (
      <>
       {<div ref={tableRef}>
          {selectedReportType === 'Agent' ? (
            <AgentReport fromDate={fromDate} toDate={toDate} />
          ) : selectedReportType === 'Support Ticket' ? (
            <TicketReport />
          ) : selectedReportType === 'Building' ? (
            <BuildingReport fromDate={fromDate} toDate={toDate} />
          ) : selectedReportType === 'Asset Assignment' ? (
            <AssetAssignmentReport fromDate={fromDate} toDate={toDate} />
          ) : selectedReportType === 'Warrenty Expiration' ? (
            <WarrantyExpirationReport fromDate={fromDate} toDate={toDate} />
          ) : null}
          </div>}
      </>
    );
  };
  return (
    <Container>
      <div>
      <h2  className="table-page-heading">REPORTS</h2>
        <div
          className="shadow p-3 mb-4 bg-white rounded"
          style={{ margin: '0 0 0 65px' }}
        >
           <ReportFilter
          onReportTypeChange={handleReportTypeChange}
          onDateChange={handleDateChange}
          onDepartmentChange={handleDepartmentChange}
          onSelectedReportTypeChange={handleSelectedReportTypeChange}
          />
        </div>
        <div style={{ margin: '0 0 0 65px', width: '100%' }}>
           {/* code for ReportButton component */}
           <ReportButton departmentName={departmentName} selectedReportType={selectedReportType} tableRef={tableRef} />
        </div>
        {renderTable()}
      </div>
    </Container>
  )
}

export default Report
