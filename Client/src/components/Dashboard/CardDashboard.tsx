import React, { useState, useEffect } from 'react'
import axios from 'axios'
interface IPROPS {
  name: String
  count: Number
}
const CardDashboard: React.FC<IPROPS> = ({ name, count }) => {
  const [availableAgentCount, setAvailableAgentCount] = useState<number>(0)
  const [solvedTicketCount, setSolvedTicketCount] = useState<number>(0)
  const [averageResponseTime, setAverageResponseTime] = useState<number>(0)
  useEffect(() => {
    axios
      .get('http://localhost:5293/ITDashboard/available-agent-count')
      .then((response) => {
        setAvailableAgentCount(response.data.availableAgentCount)
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get('http://localhost:5293/ITDashboard/solved-ticket-count')
      .then((response) => {
        setSolvedTicketCount(response.data.count)
      })
      .catch((error) => {
        console.error(error)
      })
    axios
      .get('http://localhost:5293/ITDashboard/average-response-time')
      .then((response) => {
        setAverageResponseTime(response.data.time)
      })
      .catch((error) => {
        console.error(error)
      })
  }, [])
  return (
    <div className="col-xl-4 col-sm- py-3">
      <div className="card  text-white h-100 " style={{ borderRadius: '10px' }}>
        <div
          className="card-body "
          style={{ backgroundColor: '#482890', borderRadius: '10px' }}
        >
          <h6 className="text-uppercase">{name}</h6>
          <h2 className="display-12">
            <>{count}</>
          </h2>
        </div>
      </div>
    </div>
  )
}

export default CardDashboard
