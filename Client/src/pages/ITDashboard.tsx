import React from "react";
import { Container, Row, Col, Table, } from "react-bootstrap";
import LineChart from "../components/Dashboard/LineChart";
import "../css/Home.css";
import CardDashboard from "../components/Dashboard/CardDashboard";
import BarChart from "../components/Dashboard/BarChart";
import TicketBarChart from "../components/Dashboard/TicketBarChart";

const options = {
  scales: {
    x: {
      title: {
        display: true,
        text: 'Month'
      }
    },
    y: {
      title: {
        display: true,
        text: 'Quanty'
      }
    }
  }}

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
          text: 'Value',
        },
      },
    },
  }
const ITDashboard: React.FC = () => {
  return (
    <div>
      <Container>
             <h4 style={{margin:"0px 0 0 65px"}}>IT Summary</h4>
                <div className="row mb-6" style={{margin:"0px 0 0 65px"}} >
                  <CardDashboard name="Available Agents" quantity={98}  />
                  <CardDashboard  name="Solved Tickets" quantity={98}  />
                  <CardDashboard  name="Average Response Time" quantity={98}  />
                  </div>
            
            <h4 style={{margin:"0px 0 0 65px"}}
            >
            New Tickets
            </h4>
            <div>
              <Row>
                <Col md={6}>
                  <div className="shadow p-4 mb-6 bg-white rounded" 
                    style={{
                      paddingTop: "100px",
                      height:"450px",
                      margin:"0px 0 0 65px",
                      width: "900px",
                     alignContent:"center",
                    }}
                  >
                    <LineChart Linedata={Linedata} Lineoptions={Lineoptions} />
                      
                      
                 
      
      </div>
                </Col>
               
              </Row>
            </div>
            <h4 style={{margin:"0px 0 0 65px"}}>Ticket Satisfaction</h4>
            <div style={{margin:"0px 0 0 65px"}}>
              <TicketBarChart data={{
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
                    {
                      label: 'Returned',
                      data: [20, 10, 2, 5, 2, 3, 8, 9],
                      backgroundColor: '#ff615a',
                    },
                  ],
                }}
                options={options}  />
            </div>
          
  
                  </Container>



    </div>

  )
}



     
   
export default ITDashboard ;