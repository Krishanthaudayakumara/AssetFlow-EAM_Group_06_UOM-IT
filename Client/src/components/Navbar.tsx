import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Badge,
} from "react-bootstrap";
import { FaRegBell } from "react-icons/fa";
import "../css/Navbar.css"; // import background image CSS file


const MyNavbar: React.FC = () => {
  const notifications = [
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ];

  const [notificationCount, setNotificationCount] = useState(2);

  return (
    <Navbar  expand="lg">
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav" className="as-nav" >
        <Nav className="mr-auto">
          <Form className="form-inline">
            <FormControl type="text" placeholder="Search" className="mr-2 searchbar" />
            {/* <Button variant="outline-success">Search</Button> */}
          </Form>
        </Nav>
        <Nav>
          <NavDropdown
            title={
              <img
                src="/img/krish.png"
                alt="User profile"
                className="rounded-circle"
                width="30"
                height="30"
              />
            }
            id="basic-nav-dropdown"
          >
            <NavDropdown.Item href="#">Krishantha</NavDropdown.Item>
            <NavDropdown.Divider />
            <NavDropdown.Item href="#">Notifications</NavDropdown.Item>
            <NavDropdown.Item href="#">Settings</NavDropdown.Item>
            <NavDropdown.Item href="#">Logout</NavDropdown.Item>
          </NavDropdown>
          <NavDropdown className="notification" title={
            <><FaRegBell color="#482890" fontSize={"1.8em"} className="mr-2" />
            <Badge>{notificationCount}</Badge></>
          }>
            {notifications.map((notification) => (
              <NavDropdown.Item key={notification.id}>
                {notification.message}
              </NavDropdown.Item>
            ))}
          </NavDropdown>
          
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default MyNavbar;