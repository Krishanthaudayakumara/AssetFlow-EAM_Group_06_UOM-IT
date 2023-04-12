import React, { useState, useEffect } from 'react'
import axios, { AxiosResponse} from 'axios'
import { Container, Row, Col } from 'react-bootstrap'
import LineChart from '../../components/Dashboard/LineChart'
import '../../css/Home.css'
import CardDashboard from '../../components/Dashboard/CardDashboard'
import TicketBarChart from '../../components/Dashboard/TicketBarChart'
interface TicketCount {
  month: string
  count: number
}
interface TicketSatisfaction {
  month: string
  goodCount: number
  betterCount: number
  worstCount: number
}
const ITDashboard = () => {
  const [ticketCounts, setTicketCounts] = useState<TicketCount[]>([])
  const [availableAgentCount, setAvailableAgentCount] = useState<number>(0)
  const [solvedTicketCount, setSolvedTicketCount] = useState<number>(0)
  const [averageResponseTime, setAverageResponseTime] = useState<number>(0)
  const [ticketSatisfaction, setTicketSatisfaction] = useState<TicketSatisfaction[]>([])

  useEffect(() => {
    axios
      .get('http://localhost:5087/ITDashboard/monthly-ticket-counts')
      .then((response) => {
        setTicketCounts(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get('http://localhost:5087/ITDashboard/available-agent-count')
      .then((response) => {
        setAvailableAgentCount(response.data.availableAgentCount)
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get('http://localhost:5087/ITDashboard/solved-ticket-count')
      .then((response) => {
        setSolvedTicketCount(response.data.solvedTicketCount)
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get('http://localhost:5087/ITDashboard/avg-response-time')
      .then((response) => {
        setAverageResponseTime(response.data)
      })
      .catch((error) => {
        console.log(error)
      })

    axios
      .get('http://localhost:5087/ITDashboard')
      .then((response: AxiosResponse) => {
        setTicketSatisfaction(response.data)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])

  const lineData = {
    labels: ticketCounts.map((ticketCount) => ticketCount.month),
    datasets: [
      {
        label: 'Ticket Count',
        data: ticketCounts.map((ticketCount) => ticketCount.count),
        borderColor: '#482890',
        backgroundColor: '#482890',
      },
    ],
  }
  const Lineoptions = {
    responsive: true,
    plugins: {
      legend: {
        position: {
          x: 0,
          y: 0,
        },
      },
      title: {
        display: true,
        text: 'Monthly Ticket Count',
      },
    },
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Count',
        },
      },
    },
  }

  const chartData = {
    data: {
      labels: ticketSatisfaction.map((satisfaction) => satisfaction.month),
      datasets: [
        {
          label: 'Good',
          data: ticketSatisfaction.map(
            (satisfaction) => satisfaction.goodCount,
          ),
          backgroundColor: 'green',
        },
        {
          label: 'Better',
          data: ticketSatisfaction.map(
            (satisfaction) => satisfaction.betterCount,
          ),
          backgroundColor: 'yellow',
        },
        {
          label: 'Worst',
          data: ticketSatisfaction.map(
            (satisfaction) => satisfaction.worstCount,
          ),
          backgroundColor: 'red',
        },
      ],
    },
  }
  const options = {
    scales: {
      x: {
        title: {
          display: true,
          text: 'Month',
        },
      },
      y: {
        title: {
          display: true,
          text: 'Quanty',
        },
      },
    },
  }
  return (
    <div>
      <Container>
        <h4 style={{ margin: '0px 0 0 65px' }}>IT Summary</h4>
        <div className="row mb-6" style={{ margin: '0px 0 0 65px' }}>
        {/* code for CardDashboard component */}
          <CardDashboard name="Available Agents" count={availableAgentCount} />
          <CardDashboard name="Solved Tickets" count={solvedTicketCount} />
          <CardDashboard
            name="Average Response Time"
            count={averageResponseTime}
          />
        </div>

        <h4 style={{ margin: '0px 0 0 65px' }}>Monthly Ticket Count</h4>
        <div>
          <Row>
            <Col md={6}>
              <div
                className="shadow p-4 mb-6 bg-white rounded"
                style={{
                  paddingTop: '100px',
                  height: '450px',
                  margin: '0px 0 0 65px',
                  width: '900px',
                  alignContent: 'center',
                }}
              >
                 {/* code for LineChart component */}
                <LineChart Linedata={lineData} Lineoptions={Lineoptions} />
              </div>
            </Col>
          </Row>
        </div>

        {/* code for TicketBarChart component */}
        <h4 style={{ margin: '0px 0 0 65px' }}>Ticket Satisfaction</h4>
        <div style={{ margin: '0px 0 0 65px' }}>
          <TicketBarChart
            data={{
              labels: ticketSatisfaction.map(
                (satisfaction) => satisfaction.month,
              ),
              datasets: [
                {
                  label: 'Good',
                  data: ticketSatisfaction.map(
                    (satisfaction) => satisfaction.goodCount,
                  ),
                  backgroundColor: '#482890',
                },
                {
                  label: 'Better',
                  data: ticketSatisfaction.map(
                    (satisfaction) => satisfaction.betterCount,
                  ),
                  backgroundColor: '#ff615a',
                },
                {
                  label: 'Worst',
                  data: ticketSatisfaction.map(
                    (satisfaction) => satisfaction.worstCount,
                  ),
                  backgroundColor: 'yellow',
                },
              ],
            }}
            options={options}
          />
        </div>
      </Container>
    </div>
  )
}
export default ITDashboard
