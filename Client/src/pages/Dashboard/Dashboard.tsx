import React from 'react'
import { Container, Row, Col, Table } from 'react-bootstrap'
import {
  faBox,
  faTicket,
  faUser,
  faWarehouse,
} from '@fortawesome/free-solid-svg-icons'
import PieChart from '../../components/Dashboard/PieChart'
import BarChart from '../../components/Dashboard/BarChart'
import LineChart from '../../components/Dashboard/LineChart'
import Card from '../../components/Dashboard/Card'
import '../../css/Home.css'


const data = [
  {
    id: '1',
    User: 'Krish',
    UserName: '@mark',
    Role: 'krish',
    Department: 'Krish',
    Email: 'Krish',
    JoinedDate: 'Krish',
    Actions: 'Krish',
  },
  {
    id: '2',
    User: 'Vidath',
    UserName: '@Sam',
    Role: 'krish',
    Department: 'Krish',
    Email: 'Krish',
    JoinedDate: 'Krish',
    Actions: 'Krish',
  },
  {
    id: '3',
    User: 'Chamudi',
    UserName: '@jane',
    Role: 'krish',
    Department: 'Krish',
    Email: 'Krish',
    JoinedDate: 'Krish',
    Actions: 'Krish',
  },
  {
    id: '1',
    User: 'Krish',
    UserName: '@mark',
    Role: 'krish',
    Department: 'Krish',
    Email: 'Krish',
    JoinedDate: 'Krish',
    Actions: 'Krish',
  },
]

const Linedata = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Line Chart Data',
      data: [1200, 1900, 300, 500, 2000, 305, 100],
      borderColor: '#482890',
      backgroundColor: '#482890',
    },
  ],
}
const Lineoptions = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Line Chart',
    },
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

const Dashboard: React.FC = () => {
 return (
    <div>
      <Container>
         {/* code for Card component */}
        <div className="row mb-3" style={{ margin: '0px 0 0 65px' }}>
          <Card name="Available userss" quantity={87} icon={faUser} />
          <Card name="Toatal Inventory" quantity={67} icon={faBox} />
          <Card name="Asign assets" quantity={57} icon={faWarehouse} />
          <Card name="Toatal Inventory" quantity={87} icon={faTicket} />
        </div>
        <h1 style={{ margin: '0px 0 0 65px' }}>Inventory Summary</h1>

        <div
          className="shadow p-3 mb-5 bg-white rounded"
          style={{ margin: '0px 2px 2px 65px' }}
        > {/* code for BarChart component */}
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
        <div>
          <Row>
            <Col md={6}>
              <div
                className="shadow p-3 mb-5 bg-white rounded"
                style={{
                  paddingTop: '100px',
                  height: '400px',
                  margin: '0px 0 0 65px',
                  alignContent: 'center',
                }}
              > {/* code for LineChart component */}
                <LineChart Linedata={Linedata} Lineoptions={Lineoptions} />
              </div>
            </Col>
            <Col md={6}>
              <div className="shadow p-3 mb-5 bg-white rounded">
                 {/* code for PieChart component */}
                <PieChart />
              </div>
            </Col>
          </Row>
        </div>

        <hr />

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>id</th>
                <th>User</th>
                <th>User Name</th>
                <th>Role</th>
                <th>Department</th>
                <th>Email</th>
                <th>Joined date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr>
                  <td>{item.id}</td>
                  <td>{item.User}</td>
                  <td>{item.UserName}</td>
                  <td>{item.Role}</td>
                  <td>{item.Department}</td>
                  <td>{item.Email}</td>
                  <td>{item.JoinedDate}</td>
                  <td>{item.Actions}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Container>
    </div>
  )
}

export default Dashboard
