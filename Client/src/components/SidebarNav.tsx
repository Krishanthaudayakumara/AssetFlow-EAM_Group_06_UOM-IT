import React, { useState } from "react";
import { Sidebar, Menu, MenuItem, SubMenu, useProSidebar } from "react-pro-sidebar";
import {
  Nav,
  Navbar,
  NavbarBrand,
  NavItem,
  NavLink,
  Dropdown,
  Button
} from "react-bootstrap";
import { FaThLarge, FaBox, FaBuilding, FaFileAlt, FaUsers, FaShippingFast, FaComments, FaCalendarAlt } from "react-icons/fa";
import "../css/Sidebar.css";

const items = [{ label: "Dashboard", link: "/", icon: FaThLarge }, {
  label: "Inventory", icon: FaBox, dropdownItems: [{ label: "Add Items", link: "/facility/building1" }, { label: "Item", link: "/facility/building2" },],
},
{
  label: "Facility",
  icon: FaBuilding,
  dropdownItems: [
    { label: "Building 1", link: "/facility/building1" },
    { label: "Building 2", link: "/facility/building2" },
  ],
},
{ label: "Reports", link: "/report", icon: FaFileAlt },
{
  label: "Users",
  icon: FaUsers,
  dropdownItems: [
    { label: "All Users", link: "/user" },
    { label: "Add User", link: "/user/add" },
  ],
},
{ label: "Suppliers", link: "/supplier", icon: FaShippingFast },
{ label: "Support", link: "/support", icon: FaComments },
{ label: "Calendar", link: "/calendar", icon: FaCalendarAlt },
];

interface SidebarProps {
  active: string;
}
const SidebarNav: React.FC<SidebarProps> = (props) => {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };
  const [collapsed, setCollapsed] = useState(false);
  const { collapseSidebar } = useProSidebar();


  return (
    <Sidebar
      // collapsed={collapsed}
      // toggle={() => setCollapsed(!collapsed)}
      breakPoint={"sm"}
      rtl={false}
    >
      <div className="sidebar-logo">
        <img
          className="logo-img"
          src="/img/favicon.png"
          alt="Logo"
          width="100"
        />
      </div>
      <Button className="collapse-button" onClick={() => collapseSidebar()}>Collapse</Button>
      <div className="sidebar-nav-padding"></div>
      <Nav className="sidebar-nav flex-column">
        {items.map((item) => {
          if (item.dropdownItems) {
            return (
              <div className="nav-item" key={item.label}>
                <div
                  className={`side-link nav-link ${props.active === item.link ? "active" : ""
                    }`}
                  onClick={() => toggle(item.label)}
                >
                  <item.icon fontSize="1.2em" className="side-item mr-2" />
                  {item.label}
                </div>
                {openKey === item.label && (
                  <div className="">
                    {item.dropdownItems.map((dropdownItem) => (
                      <a
                        key={dropdownItem.link}
                        href={dropdownItem.link}
                        className="nav-link dropdown-item"
                      >
                        {dropdownItem.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          } else {
            return (
              <NavItem key={item.link}>
                <NavLink
                  className={`side-link ${props.active === item.link ? "active" : ""
                    }`}
                  href={item.link}
                >
                  <item.icon fontSize="1.2em" className="side-item mr-2" />
                  {item.label}
                </NavLink>
              </NavItem>
            );
          }
        })}
      </Nav>
    </Sidebar>

  );
};

export default SidebarNav;
