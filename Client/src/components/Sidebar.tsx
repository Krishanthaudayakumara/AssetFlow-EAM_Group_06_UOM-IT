import React from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink } from "react-bootstrap";
import { FaHome, FaInfoCircle, FaCogs, FaUser } from "react-icons/fa";

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
  { label: "Home", link: "/", icon: FaHome },
  { label: "About", link: "/about", icon: FaInfoCircle },
  { label: "Settings", link: "/settings", icon: FaCogs },
  { label: "Profile", link: "/profile", icon: FaUser },
];

const Sidebar: React.FC = () => {
  return (
    <Navbar bg="light" expand="lg" className="sidebar">
      <div className="sidebar-logo">
        <img src="/img/logo.png" alt="Logo" width="300" />
      </div>
      <div className="sidebar-nav-padding"></div>

      <Nav className="sidebar-nav flex-column">
        {items.map((item) => (
          <NavItem key={item.link}>
            <NavLink className="side-link" href={item.link}>
              <item.icon className="side-item mr-2" />
              {item.label}
            </NavLink>
          </NavItem>
        ))}
      </Nav>
    </Navbar>
  );
};

export default Sidebar;
