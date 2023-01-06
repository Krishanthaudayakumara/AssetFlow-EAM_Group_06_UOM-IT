import React from "react";
import { Form, Button, Container, Row, Col, Image, Table } from "react-bootstrap";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import PieChart from "../components/Dashboard/PieChart";
import "../css/Home.css";    
  const data = [
    { id: "1", User: "Krish", UserName: "@mark", Role: "krish",Department: "Krish", Email: "Krish",JoinedDate: "Krish",Actions: "Krish"},
    { id: "2", User: "Vidath",UserName : "@Sam",Role : "krish",Department: "Krish", Email: "Krish",JoinedDate: "Krish",Actions: "Krish" },
    { id: "3", User: "Chamudi",UserName : "@jane", Role: "krish",Department: "Krish", Email: "Krish",JoinedDate: "Krish",Actions: "Krish" },
    { id: "1", User: "Krish",UserName : "@mark",Role : "krish",Department: "Krish", Email: "Krish",JoinedDate: "Krish",Actions: "Krish" },
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

          <h1>Asset Summary</h1>

          
          {/*<ReportFilter/>*/}
          {/*<PieChart />*/}

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
      </Col>
    </Row>
  </Container>
  );
};

export default Dashboard;