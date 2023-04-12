import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import ReportFilter from '../../components/Report/ReportFilter'
import '../../css/Home.css'
import ReportButton from '../../components/Report/ReportButton'
import AgentReport from '../../components/Report/AgentReport'
import TicketReport from '../../components/Report/TicketReport'

const Report: React.FC = () => {
  const [selectedReportType, setSelectedReportType] = useState<string>('')

  const handleReportTypeChange = (reportType: string) => {
    setSelectedReportType(reportType)
  }

  const renderTable = () => {
    if (selectedReportType === 'Agent') {
      return <AgentReport />
    } else if (selectedReportType === 'Support Ticket') {
      return <TicketReport />
    } else {
      return null
    }
  }

  return (
    <Container>
      <div>
        <h1 style={{ margin: '0px 0 20px 65px' }}>Reports</h1>
        <div
          className="shadow p-3 mb-4 bg-white rounded"
          style={{ margin: '0 0 0 65px' }}
        >
          <ReportFilter onReportTypeChange={handleReportTypeChange} />
        </div>
        <div style={{ margin: '0 0 0 65px', width: '100%' }}>
           {/* code for ReportButton component */}
          <ReportButton />
        </div>
        {renderTable()}
      </div>
    </Container>
  )
}

export default Report
