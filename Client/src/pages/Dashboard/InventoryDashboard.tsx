import React from 'react'
import { Container } from 'react-bootstrap'
import BarChart from '../../components/Dashboard/BarChart'
import '../../css/Home.css'
import CardDashboard from '../../components/Dashboard/CardDashboard'
import InventoryTable from '../../components/Report/InventoryTable'

const options = {
  title: {
    display: true,
    text: 'Chart.js Bar Chart',
  },
}

const InventoryDashboard: React.FC = () => {
  return (
    <div>
      <Container>
        <div>
          <h1 style={{ margin: '0px 0 0 65px' }}>Inventory Summary</h1>
          <div className="row mb-6" style={{ margin: '0px 0 0 65px' }}>
            <CardDashboard name="Assigned assets" count={98} />
            <CardDashboard name="Available user" count={98} />
            <CardDashboard name="Available user" count={98} />
          </div>

          <div
            className="shadow p-3 mb-5 bg-white rounded"
            style={{ margin: '0px 2px 2px 65px' }}
          >
            <BarChart
              data={{
                labels: [
                  'January',
                  'February',
                  'March',
                  'April',
                  'May',
                  'June',
                  'July',
                ],
                datasets: [
                  {
                    label: 'Issued',
                    data: [40, 20, 30, 50, 90, 10, 20],
                    backgroundColor: '#482890',
                  },
                  {
                    label: 'Returned',
                    data: [20, 10, 2, 5, 2, 3, 8, 9],
                    backgroundColor: '#ff615a',
                  },
                ],
              }}
              options={options}
            />
          </div>
          <h4
            className="second"
            style={{
              textAlign: 'center',
            }}
          >
            Data in Chart
          </h4>
          <div></div>

          <InventoryTable />
        </div>
      </Container>
    </div>
  )
}
export default InventoryDashboard
