import React, { Fragment, useState, useEffect } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Table } from 'react-bootstrap'
import axios from 'axios'

interface AgentReportProps {
  fromDate: string;
  toDate: string;
}
interface Agent {
  id: number
  agentFirstName: String
  agentLastName: String
  teamName: string
  openedTickets: number
  solvedTickets: number
  pendingTickets: number
  joinDate: string
}

const AgentReport: React.FC<AgentReportProps> = ({ fromDate, toDate }) => {
  const [agentReports, setAgentReports] = useState<Agent[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5087/api/SupportAgentReport')
      .then((response) => {
        const data = response.data.filter((agent: Agent) => {
          const agentJoinDate = new Date(agent.joinDate);

          if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);

            return agentJoinDate >= from && agentJoinDate <= to;
          } else if (fromDate) {
            const from = new Date(fromDate);
            return agentJoinDate >= from;
          } else if (toDate) {
            const to = new Date(toDate);
            return agentJoinDate <= to;
          } else {
            return true;
          }
        });

        setAgentReports(data);
      })
      .catch((error) => {
        alert(error);
      });
  }, [fromDate, toDate]);
  return (
    <Fragment>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: '30px 0 0 65px' }}
      >
        <Table
          className="table w-100 small table-borderless table-responsiv align-middle align-left"
          hover
          style={{ fontSize: '13px' }}
        >
          <thead>
            <tr style={{ color: '#482890' }}>
             
              <th>First Name</th>
              <th>Last Name</th>
              <th>Team Name</th>
              <th>Open Tickets</th>
              <th>Solved Tickets</th>
              <th>Pending Tickets</th>
              <th>Join Date</th>
            </tr>
          </thead>
          <tbody>
            {agentReports.map((agentReport) => (
              <tr key={agentReport.id}>
                
                <td className="text-secondary">{agentReport.agentFirstName}</td>
                <td className="text-secondary">{agentReport.agentLastName}</td>
                <td className="text-secondary">{agentReport.teamName}</td>
                <td className="text-secondary">{agentReport.openedTickets}</td>
                <td className="text-secondary">{agentReport.solvedTickets}</td>
                <td className="text-secondary">{agentReport.pendingTickets}</td>
                <td className="text-secondary">{agentReport.joinDate}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  )
}

export default AgentReport