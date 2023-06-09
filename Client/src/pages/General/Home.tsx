import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import "../../css/Home.css"; // import background image CSS file

const data = [
  { id: "1", fname: "Krish", lname: "FaHome", uname: "krish" },
  { id: "2", fname: "Vidath", lname: "FaHome", uname: "krish" },
  { id: "3", fname: "Chamudi", lname: "FaHome", uname: "krish" },
  { id: "1", fname: "Krish", lname: "FaHome", uname: "krish" },
];

const isMobile = () => {
  return window.innerWidth < 768;
};

const Home: React.FC = () => {
  return (
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
  );
};

export default Home;
