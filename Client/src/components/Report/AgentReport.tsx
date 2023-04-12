import React, { Fragment, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'react-bootstrap'
import axios from 'axios'

interface Agent {
  id: number
  agentFirstName: String
  agentLastName: String
  teamId: number
  openedTickets: number
  solvedTickets: number
  pendingTickets: number
}

const AgentReport = () => {
  const [agentReports, setAgtReneports] = useState<Agent[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:5087/api/SupportAgentReport')
      .then((response) => {
        setAgtReneports(response.data)
      })
      .catch((error) => {
        alert(error)
      })
  }, [])
  return (
    <Fragment>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: '30px 0 0 65px' }}
      >
        <Table
          className="table w-100 small table-borderless table-responsiv align-middle align-left"
          hover
          style={{ fontSize: '14px' }}
        >
          <thead>
            <tr style={{ color: '#482890' }}>
              <th></th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Team ID</th>
              <th>Open Tickets</th>
              <th>Solved Tickets</th>
              <th>Pending Tickets</th>
            </tr>
          </thead>
          <tbody>
            {agentReports.map((agentReport) => (
              <tr key={agentReport.id}>
                <td className="text-secondary">{agentReport.id}</td>
                <td className="text-secondary">{agentReport.agentFirstName}</td>
                <td className="text-secondary">{agentReport.agentLastName}</td>
                <td className="text-secondary">{agentReport.teamId}</td>
                <td className="text-secondary">{agentReport.openedTickets}</td>
                <td className="text-secondary">{agentReport.solvedTickets}</td>
                <td className="text-secondary">{agentReport.pendingTickets}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  )
}

export default AgentReport
