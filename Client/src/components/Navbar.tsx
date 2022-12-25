import React from 'react';
import { Navbar } from 'react-bootstrap';

const MyNavbar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand href="#">Enterprise Asset Management</Navbar.Brand>
    </Navbar>
  );
};

export default MyNavbar;
