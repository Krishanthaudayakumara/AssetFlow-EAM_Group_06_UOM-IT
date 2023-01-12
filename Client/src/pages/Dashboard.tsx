import React from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PieChart from "../components/Dashboard/PieChart";
import BarChart from "../components/Dashboard/BarChart";
import LineChart from "../components/Dashboard/LineChart";
import Card from "../components/Dashboard/Card";
import "../css/Home.css";

const data = [
  {
    id: "1",
    User: "Krish",
    UserName: "@mark",
    Role: "krish",
    Department: "Krish",
    Email: "Krish",
    JoinedDate: "Krish",
    Actions: "Krish",
  },
  {
    id: "2",
    User: "Vidath",
    UserName: "@Sam",
    Role: "krish",
    Department: "Krish",
    Email: "Krish",
    JoinedDate: "Krish",
    Actions: "Krish",
  },
  {
    id: "3",
    User: "Chamudi",
    UserName: "@jane",
    Role: "krish",
    Department: "Krish",
    Email: "Krish",
    JoinedDate: "Krish",
    Actions: "Krish",
  },
  {
    id: "1",
    User: "Krish",
    UserName: "@mark",
    Role: "krish",
    Department: "Krish",
    Email: "Krish",
    JoinedDate: "Krish",
    Actions: "Krish",
  },
];

const Dashboard: React.FC = () => {
  return (
    <Container>
      <Row>
        <Col md={3} className="sidebar-col">
          <div>
            <Sidebar />
          </div>
        </Col>

        <Col md={9}>
          <div>
            <Navbar />
            <div className="shadow p-3 mb-5 bg-white rounded">
            <Card />
            </div>
            <h1>Inventory Summary</h1>

            <div  className="shadow p-3 mb-5 bg-white rounded">
              <BarChart />
            </div>
            <h4
              className="second"
              style={{
                textAlign: "center",
              }}
            >
              Data in Chart
            </h4>
            <div>
              <Row>
                <Col md={6}>
                  <div className="shadow p-3 mb-5 bg-white rounded" 
                    style={{
                      paddingTop: "100px",
                      height:"400px",
                    }}
                  >
                    <LineChart />
                  </div>
                </Col>
                <Col md={6}>
                <div className="shadow p-3 mb-5 bg-white rounded" >
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
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Dashboard;
