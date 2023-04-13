import React, { Fragment, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'react-bootstrap'
import axios from 'axios'

interface Ticket {
  id: number
  ticketId: number
  createdByEmployeeId: number
  problem: String
  reply: String
  agentFirstName: String
  rating: String
}
const TicketReport = () => {
  const [TicketReports, setTicketReports] = useState<Ticket[]>([])
  useEffect(() => {
    axios
      .get('http://localhost:5087/api/SupportTicket')
      .then((response) => {
        setTicketReports(response.data)
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
              <th>Ticket Id</th>
              <th>Ticket CreatedByEmployeeId</th>
              <th>Problem</th>
              <th>Reply</th>
              <th>Agent FirstName</th>
              <th>Rating</th>
            </tr>
          </thead>
          <tbody>
            {TicketReports.map((TicketReport) => (
              <tr key={TicketReport.id}>
                <td className="text-secondary">{TicketReport.id}</td>
                <td className="text-secondary">{TicketReport.ticketId}</td>
                <td className="text-secondary">
                  {TicketReport.createdByEmployeeId}
                </td>
                <td className="text-secondary">{TicketReport.problem}</td>
                <td className="text-secondary">{TicketReport.reply}</td>
                <td className="text-secondary">
                  {TicketReport.agentFirstName}
                </td>
                <td className="text-secondary">{TicketReport.rating}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  )
}

export default TicketReport
