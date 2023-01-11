import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";
import "../css/Home.css"; // import background image CSS file
import Chatbot from "../components/Support/Chatbot";

const data = [
  { id: "1", fname: "Krish", lname: "FaHome", uname: "krish" },
  { id: "2", fname: "Vidath", lname: "FaHome", uname: "krish" },
  { id: "3", fname: "Chamudi", lname: "FaHome", uname: "krish" },
  { id: "1", fname: "Krish", lname: "FaHome", uname: "krish" },
];

const Home: React.FC = () => {
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

            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Username</th>
                </tr>
              </thead>
              <tbody>
                {data.map((item) => (
                  <tr>
                    <td>{item.id}</td>
                    <td>{item.fname}</td>
                    <td>{item.lname}</td>
                    <td>{item.uname}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Col>
      </Row>
      <Chatbot/>
    </Container>
  );
};

export default Home;
