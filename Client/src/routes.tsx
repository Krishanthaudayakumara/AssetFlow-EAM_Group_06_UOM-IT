import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Home from "./pages/General/Home";
import User from "./pages/User/User";
import UserAccessLogPage from "./pages/User/UserAccessLogPage";

import StockPage from "./pages/Inventory/Stock/StockPage";
import SubCategoryPage from "./pages/Inventory/Category/SubCategoryPage";
import CategoryPage from "./pages/Inventory/Category/CategoryPage";
import EmployeeRequest from "./pages/Inventory/EmployeeRequest/EmployeeRequest";


import AssignAsset from "./pages/Facility/AssignAsset";
import BuildingFloor from "./pages/Facility/BuildingFloor";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";
import Tickets from "./pages/Support/Tickets";
import Agents from "./pages/Support/Agents";
import Teams from "./pages/Support/Teams";
import Issues from "./pages/Support/Issues";
import PrivateRoute from "./PrivateRoute";
import Employee from "./pages/Employee/Employee";
import Department from "./pages/Department/Department";
import Calendar from "./pages/General/Calendar";
import Supplier from "./pages/Supplier/Supplier";

import FacilityAsset from "./pages/Facility/FacilityAsset";
import FacilityStock from "./pages/Facility/FacilityStock";

import Report from "./pages/Report/Report";
import Dashboard from "./pages/Dashboard/Dashboard";
import FacilityDashboard from "./pages/Dashboard/FacilityDashboard";
import InventoryDashboard from "./pages/Dashboard/InventoryDashboard";
import ITDashboard from "./pages/Dashboard/ITDashboard";
import ReportHistory from "./components/Report/ReportHistory";
import DeletedUsersPage from "./pages/User/DeletedUsersPage";
import "./App.css";
import "./css/Buttons.css";
import jwtDecode from "jwt-decode";
import ProfilePage from "./pages/User/ProfilePage";
import DeletedEmployeePage from "./pages/Employee/DeletedEmployeePage";
import MyTickets from "./pages/Support/MyTickets";

const RoutesConfig: React.FC = () => {
  const token = localStorage.getItem("token");
  let defaultDashboard: React.ReactElement;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken.role;

    if (userRole === "FacManager") {
      defaultDashboard = <FacilityDashboard />;
    } else if (userRole === "ItManager") {
      defaultDashboard = <ITDashboard />;
    } else if (userRole === "InvManager") {
      defaultDashboard = <InventoryDashboard />;
    } else {
      defaultDashboard = <Dashboard />;
    }
  } else {
    defaultDashboard = <Login />;
  }
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/" element={defaultDashboard} />
      </Route>

      <Route path="Report" >
        "
        <Route path="/Report" element={<Report />} />
      </Route>
      <Route
        path="/FacilityDashboard"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/FacilityDashboard" element={<FacilityDashboard />} />
      </Route>

      <Route
        path="/InventoryDashboard"
       
      >
        <Route path="/InventoryDashboard" element={<InventoryDashboard />} />
      </Route>

      <Route path="/ITDashboard" >
        <Route path="/ITDashboard" element={<ITDashboard />} />
      </Route>

      <Route
        path="/ReportHistory"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/ReportHistory" element={<ReportHistory />} />
      </Route>

      <Route path="/profile" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/user" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/user" element={<User />} />
      </Route>

      <Route
        path="/deleted-users"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/deleted-users" element={<DeletedUsersPage />} />
      </Route>

      <Route
        path="/users/:userId/access-log"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route
          path="/users/:userId/access-log"
          element={<UserAccessLogPage />}
        />
      </Route>

      <Route path="/employee" >
        <Route path="/employee" element={<Employee />} />
      </Route>

      <Route
        path="/deleted-employee"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/deleted-employee" element={<DeletedEmployeePage />} />
      </Route>

      <Route path="/department" >
        <Route path="/department" element={<Department />} />
      </Route>

      <Route path="/calendar" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/calendar" element={<Calendar />} />
      </Route>

      <Route path="/supplier" >
        <Route path="/supplier" element={<Supplier />} />
      </Route>

      <Route path="/Tickets" >
        <Route path="/Tickets" element={<Tickets />} />
      </Route>

      <Route path="/Agents" >
        <Route path="/Agents" element={<Agents />} />
      </Route>

      <Route path="/Teams" >
        <Route path="/Teams" element={<Teams />} />
      </Route>

      <Route path="/Issues">
        <Route path="/Issues" element={<Issues />} />
      </Route>

      <Route path="/MyTickets">
        <Route path="/MyTickets" element={<MyTickets />} />
      </Route>

      {/* Pages */}
      <Route path="/Category" >
        <Route path="/Category" element={<CategoryPage />} />
      </Route>

      <Route path="/SubCategory" >
        <Route path="/SubCategory" element={<SubCategoryPage />} />
      </Route>

      <Route path="/EmployeeRequest" >
        <Route path="/EmployeeRequest" element={<EmployeeRequest />} />
      </Route>

      <Route path="/" >
        <Route path="/Stock" element={<StockPage />} />
      </Route>

      <Route
        path="/BuildingFloor"
        
      >
        <Route path="/BuildingFloor" element={<BuildingFloor />} />
      </Route>
      <Route path="/AssignAsset" >
        <Route path="/AssignAsset" element={<AssignAsset />} />
      </Route>
      <Route
        path="/FacilityAsset"
        
      >
        <Route path="/FacilityAsset" element={<FacilityAsset />} />
      </Route>

      <Route
        path="/FacilityStock"
       
      >
        <Route path="/FacilityStock" element={<FacilityStock />} />
      </Route>

      <Route path="/AssignAsset"  >
          <Route
            path="/AssignAsset"
            element={
             
                <AssignAsset />
            }
          />
          </Route>

    </Routes>
  );
};

export default RoutesConfig;
