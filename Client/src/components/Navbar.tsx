import React, { useState, useEffect } from "react";
import { Navbar, Nav, Form, Button, NavDropdown, Badge } from "react-bootstrap";
import { FaRegBell, FaMoon, FaSun } from "react-icons/fa";
import NotificationList from "./Notification/NotificationList";
import "../css/Navbar.css";
import { useNavigate } from "react-router";
import jwtDecode from "jwt-decode";

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

interface Notification {
  id: number;
  message: string;
  imageUrl: string;
  isRead: boolean;
}

const MyNavbar: React.FC<NavbarProps> = ({ theme, toggleTheme }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [notificationCount, setNotificationCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      if (savedTheme === "dark") {
        toggleTheme();
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    // Make an API call to fetch user notifications
    const fetchUserNotifications = async () => {
      try {
        const token = localStorage.getItem("token");
        const decodedToken: any = jwtDecode(token as string);

        let apiUrl = `http://localhost:5087/api/Notifications/UserNotifications/${decodedToken.unique_name}`;

        const response = await fetch(apiUrl);
        const data = await response.json();

        const unreadNotifications = data.filter(
          (notification: { isRead: boolean }) => !notification.isRead
        );

        setNotifications(data);
        setNotificationCount(unreadNotifications.length);
      } catch (error) {
        console.log(error);
      }
    };

    fetchUserNotifications();
  }, []);

  const markNotificationAsRead = async (notificationId: number) => {
    try {
      const token = localStorage.getItem("token");
      const decodedToken: any = jwtDecode(token as string);

      let apiUrl = `http://localhost:5087/api/Notifications/MarkAsRead?username=${decodedToken.unique_name}&notificationId=${notificationId}`;

      await fetch(apiUrl, {
        method: "PUT",
        headers: {
          Accept: "application/json",
        },
      });

      // Update the notification count and remove the read notification from the state
      setNotificationCount((prevCount) => prevCount - 1);
      setNotifications((prevNotifications) =>
        prevNotifications.filter(
          (notification) => notification.id !== notificationId
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Navbar className={`top-bar ${theme === "dark" ? "dark-theme" : ""}`}>
      <Nav className="me-auto">
        <Form className="form-inline">
          {/* <FormControl type="text" placeholder="Search" className="mr-2 searchbar" /> */}
          {/* <Button variant="outline-success">Search</Button> */}
        </Form>
      </Nav>
      <Nav className="mr-auto">
        <NavDropdown
          key={"down-centered"}
          id="dropdown-button-drop-down-centered"
          align={{ xxl: "start" }}
          drop={"down-centered"}
          title={
            <img
              src="/img/user-g.png"
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
        <NavDropdown
          className="notification"
          key={"down-centered"}
          id="dropdown-button-drop-down-centered"
          align={{ xxl: "start" }}
          drop={"down-centered"}
          title={
            <>
              <FaRegBell color="#482890" fontSize={"1.8em"} className="mr-2" />
              <Badge>{notificationCount}</Badge>
            </>
          }
        >
          {notifications.length > 0 ? (
            <NotificationList
              notifications={notifications}
              onNotificationRead={markNotificationAsRead}
            />
          ) : (
            <NavDropdown.Item disabled>No new notifications</NavDropdown.Item>
          )}
        </NavDropdown>

        <Button variant="link" className="theme-toggle" onClick={toggleTheme}>
          {theme === "light" ? <FaMoon /> : <FaSun />}
        </Button>
      </Nav>
    </Navbar>
  );
};

export default MyNavbar;
