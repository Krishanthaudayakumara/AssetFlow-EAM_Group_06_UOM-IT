import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "react-bootstrap";
<<<<<<< HEAD
import { FaHome, FaInfoCircle, FaCogs, FaUser } from "react-icons/fa";
=======
import { FaThLarge, FaBox, FaBuilding, FaFileAlt, FaUsers, FaShippingFast, FaComments, FaCalendarAlt } from "react-icons/fa";
>>>>>>> dev

import "../css/Sidebar.css"; // import background image CSS file

// interface SidebarProps {
//   title: string;
//   items: {
//     label: string;
//     link: string;
//   }[];
// }

// const Sidebar: React.FC<SidebarProps> = (props) => {
//   return (
//     <Navbar bg="light" expand="lg" className="sidebar">
//       <NavbarBrand>{props.title}</NavbarBrand>
//       <Nav className="flex-column">
//         {props.items.map((item) => (
//           <NavItem key={item.link}>
//             <NavLink href={item.link}>{item.label}</NavLink>
//           </NavItem>
//         ))}
//       </Nav>
//     </Navbar>
//   );
// };

const items = [
<<<<<<< HEAD
  { label: "Home", link: "/", icon: FaHome },
  { label: "About", link: "/about", icon: FaInfoCircle },
  { label: "Settings", link: "/settings", icon: FaCogs },
  { label: "Profile", link: "/profile", icon: FaUser },
=======
  { label: "Dashboard", link: "/", icon: FaThLarge },
  { label: "Inventory", link: "/inventory", icon: FaBox },
  { label: "Facility", link: "/facility", icon: FaBuilding },
  { label: "Reports", link: "/report", icon: FaFileAlt },
  { label: "Users", link: "/user", icon: FaUsers },
  { label: "Suppliers", link: "/supplier", icon: FaShippingFast },
  { label: "Support", link: "/support", icon: FaComments },
  { label: "Calendar", link: "/calendar", icon: FaCalendarAlt },





  
>>>>>>> dev
];

const Sidebar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" className="sidebar">
      <div className="sidebar-logo">
<<<<<<< HEAD
        <img src="/img/logo.png" alt="Logo" width="300" />
=======
        <img className="logo-img" src="/img/favicon.png" alt="Logo" width="100" />
>>>>>>> dev
      </div>
      <div className="sidebar-nav-padding"></div>

      <Nav className="sidebar-nav flex-column">
      

        {items.map((item) => (
          <NavItem key={item.link}>
            <NavLink className="side-link" href={item.link}>
<<<<<<< HEAD
              <item.icon className="side-item mr-2" />
=======
              <item.icon fontSize="1.2em" className="side-item mr-2" />
>>>>>>> dev
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
