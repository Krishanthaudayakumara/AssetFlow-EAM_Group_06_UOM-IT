import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Form,
  FormControl,
  Button,
  NavDropdown,
  Badge
} from "react-bootstrap";
import { FaRegBell } from "react-icons/fa";
import "../css/Navbar.css"; // import background image CSS file
import { useNavigate } from "react-router";


const MyNavbar: React.FC = () => {
  const notifications = [
    { id: 1, message: "Notification 1" },
    { id: 2, message: "Notification 2" },
    { id: 3, message: "Notification 3" },
  ];

  const [notificationCount, setNotificationCount] = useState(2);

  
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <Navbar className="top-bar">
      <Nav className="me-auto">
        <Form className="form-inline">
          <FormControl type="text" placeholder="Search" className="mr-2 searchbar" />
          {/* <Button variant="outline-success">Search</Button> */}
        </Form>
      </Nav>
      <Nav className="mr-auto">
        <NavDropdown
          key={"down-centered"}
          id="dropdown-button-drop-down-centered"
          align={{ xxl: 'start' }}

          drop={"down-centered"}

          title={
            <img
              src="/img/krish.png"
              alt="User profile"
              className="rounded-circle"
              width="30"
              height="30"
            />
          }
        >
          <NavDropdown.Item href="#">Krishantha</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item href="#">Notifications</NavDropdown.Item>
          <NavDropdown.Item href="#">Settings</NavDropdown.Item>
          <NavDropdown.Item onClick={handleLogout}>Logout</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown className="notification"
          key={"down-centered"}
          id="dropdown-button-drop-down-centered"
          align={{ xxl: 'start' }}

          drop={"down-centered"}
          title={
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
    </Navbar>
  );
};

export default MyNavbar;
