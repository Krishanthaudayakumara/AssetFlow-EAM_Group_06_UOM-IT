import React from 'react';
import { Navbar } from 'react-bootstrap';

const MyNavbar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <h1>Krishantha</h1>
      <Navbar.Brand href="#">Enterprise Asset Management</Navbar.Brand>
    </Navbar>
  );
};

export default MyNavbar;
