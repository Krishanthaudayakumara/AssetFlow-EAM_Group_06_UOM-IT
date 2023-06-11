import React, { useState } from "react";
import { Nav, Navbar, NavbarBrand, NavItem, NavLink, Dropdown, Row, Col } from "react-bootstrap";
import { FaAngleDown, FaThLarge, FaBox, FaBuilding, FaFileAlt, FaUsers, FaShippingFast, FaComments, FaCalendarAlt, FaAngleLeft, FaAngleRight, FaUserTie, FaSuitcase } from "react-icons/fa";
import { Link } from "react-router-dom";

import "../css/Sidebar.css"; // import background image CSS file

const Management: string[] = ["manager", "admin", "facilityManager", "inventoryManager", "supportManager"];
const Facility: string[] = ["manager", "admin", "facilityManager"];
const Inventory: string[] = ["manager", "admin", "inventoryManager"];
const SupportManager: string[] = ["manager", "admin", "supportManager"];
const AgentTeam: string[] = ["manager", "admin", "supportManager", "agent"];
const ManagerOnly: string[] = ["manager", "admin"];
const Admin: string[] = ["admin"];

const items = [
  { label: "Dashboard", link: "/", icon: FaThLarge, allowedRoles: "all" },
  {
    label: "Inventory",
    link: "/inventory",
    icon: FaBox,
    dropdownItems: [
      { label: "Category", link: "/Category", allowedRoles: Inventory },
      { label: "SubCategory", link: "/SubCategory", allowedRoles: Inventory },
      { label: "Stock", link: "/Stock", allowedRoles: Inventory },
      { label: "Asset", link: "/Asset", allowedRoles: Inventory },
      { label: "Employee Request", link: "/EmployeeRequest", allowedRoles: Inventory },
      { label: "Assign", link: "/Assign", allowedRoles: Inventory },
      { label: "Inventory Dashboard", link: "/InventoryDashboard", allowedRoles: Inventory },
      { label: "Item", link: "/inventory/building2", allowedRoles: Inventory },
    ],
  },
  {
    label: "Facility",
    icon: FaBuilding,
    link: "/facility",
    dropdownItems: [
      { label: "Building", link: "/BuildingFloor", allowedRoles: Facility },
      { label: "Facility Stock", link: "/FacilityStock", allowedRoles: Facility },
      { label: "Facility Asset", link: "/FacilityAsset", allowedRoles: Facility },
      { label: "Facility Dashboard", link: "/FacilityDashboard", allowedRoles: Facility },
      { label: "Assign Asset", link: "/AssignAsset", allowedRoles: Facility },
      { label: "Building 2", link: "/facility/building2", allowedRoles: Facility },
    ],
  },
  { label: "Reports", link: "/report", icon: FaFileAlt, allowedRoles: Management },
  { label: "Users", link: "/user", icon: FaUsers, allowedRoles: Admin },
  { label: "Employees", link: "/employee", icon: FaUserTie, allowedRoles: ManagerOnly },
  { label: "Departments", link: "/department", icon: FaSuitcase, allowedRoles: ManagerOnly },
  { label: "Supply", link: "/supplier", icon: FaShippingFast, allowedRoles: Inventory,
    dropdownItems: [
      { label: "Suppliers", link: "/supplier", allowedRoles: Inventory },
      { label: "Supply Orders", link: "/supply-orders", allowedRoles: Inventory },
      { label: "Supply Chain", link: "/supply-chain", allowedRoles: Inventory },
    ],
  },
  {
    label: "Support",
    icon: FaComments,
    link: "/support",
    dropdownItems: [
      { label: "Tickets", link: "/Tickets", allowedRoles: AgentTeam },
      { label: "Teams", link: "/Teams", allowedRoles: SupportManager },
      { label: "Agents", link: "/Agents", allowedRoles: SupportManager },
      { label: "Issues", link: "/Issues", allowedRoles: SupportManager },
      { label: "My Tickets", link: "/MyTickets", allowedRoles: "all" },
      { label: "IT Dashboard", link: "/ITDashboard", allowedRoles: SupportManager },
    ],
  },
  { label: "Notification Center", link: "/Notifications", icon: FaCalendarAlt, allowedRoles: Management },
];

interface SidebarProps {
  active: string;
  theme: string;
  userRoles: string[];
}

const Sidebar: React.FC<SidebarProps> = (props) => {
  const [openKey, setOpenKey] = useState<string | null>(null);
  const [collapsed, setCollapsed] = useState(false);

  const toggle = (key: string) => {
    setOpenKey(openKey === key ? null : key);
  };

  const isMobile = () => {
    return window.innerWidth < 768;
  };

  const collapseSideBar = (collapsed: boolean) => {
    const sidebarCol = document.getElementsByClassName("sidebar-col")[0];
    const comp_sidebar_col = document.getElementsByClassName("comp-sidebar-col")[0];
    const comp_collapse_col = document.getElementsByClassName("comp-collapse-col")[0];
    const contentCol = document.getElementsByClassName("content-col")[0];
    if (collapsed) {
      sidebarCol.className = "sidebar-col col-3";
      contentCol.className = "content-col col-8";
      comp_sidebar_col.className = "comp-sidebar-col col-10";
      comp_collapse_col.className = "comp-collapse-col col-2";
    } else {
      sidebarCol.className = "sidebar-col col-1";
      contentCol.className = "content-col col-10";
      comp_sidebar_col.className = "comp-sidebar-col col-8";
      comp_collapse_col.className = "comp-collapse-col col-4";
    }
    setCollapsed(!collapsed);
  };

  const isRoleAllowed = (allowedRoles: string | string[] | undefined) => {
    if (!allowedRoles) {
      return true; // If allowedRoles is undefined, consider it as allowed for all roles
    }
    if (allowedRoles === "all") {
      return true;
    }
    if (Array.isArray(allowedRoles)) {
      return allowedRoles.some((role) => props.userRoles.includes(role));
    }
    return props.userRoles.includes(allowedRoles);
  };

  return (
    <Row>
      <Col md={10} className="comp-sidebar-col">
        <Navbar bg={props.theme === "dark" ? "dark" : "light"} expand="lg" className="sidebar">
          <div className="sidebar-logo">
            <img
              className="logo-img"
              src="/img/favicon.png"
              alt="Logo"
              width={collapsed || isMobile() ? "70" : "100"}
              style={{ paddingLeft: collapsed || isMobile() ? "10px" : "0px" }}
            />
          </div>
          <div className="sidebar-nav-padding"></div>
          <Nav className="sidebar-nav flex-column">
            {items.map((item) => {
              if (isRoleAllowed(item.allowedRoles)) {
                if (item.dropdownItems) {
                  return (
                    <div className="nav-item" key={item.label}>
                      <div
                        className={`${
                          collapsed || isMobile()
                            ? "side-link-collapsed"
                            : "side-link"
                        } nav-link ${props.active === item.link ? "active" : ""}`}
                        onClick={() => toggle(item.label)}
                      >
                        <item.icon fontSize="1.2em" className="side-item mr-2" />
                        <span className={collapsed || isMobile() ? "hidden" : ""}>
                          {item.label}
                        </span>
                        <FaAngleDown className="dropdown-icon" style={{ float: "right" }} />
                      </div>
                      {openKey === item.label && (
                        <div className="dropdown-collection">
                          {item.dropdownItems.map((dropdownItem) => {
                            if (isRoleAllowed(dropdownItem.allowedRoles)) {
                              return (
                                <Link
                                  key={dropdownItem.link}
                                  to={dropdownItem.link}
                                  className="nav-link sidenav dropdown-item"
                                >
                                  {dropdownItem.label}
                                </Link>
                              );
                            }
                            return null;
                          })}
                        </div>
                      )}
                    </div>
                  );
                } else {
                  return (
                    <NavItem key={item.link}>
                      <Link
                        className={`${
                          collapsed || isMobile()
                            ? "side-link-collapsed"
                            : "side-link"
                        } nav-link ${props.active === item.link ? "active" : ""}`}
                        to={item.link}
                      >
                        <item.icon fontSize="1.2em" className="side-item mr-2" />
                        <span className={collapsed || isMobile() ? "hidden" : ""}>
                          {item.label}
                        </span>
                      </Link>
                    </NavItem>
                  );
                }
              }
              return null;
            })}
          </Nav>
        </Navbar>
      </Col>
      <Col md={2} className="comp-collapse-col">
        <div className="collapse-button-container">
          <button
            className="collapse-button"
            onClick={() => {
              collapseSideBar(collapsed);
            }}
          >
            {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
          </button>
        </div>
      </Col>
    </Row>
  );
};

export default Sidebar;
