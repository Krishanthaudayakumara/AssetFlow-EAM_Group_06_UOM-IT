import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Home from "./pages/General/Home";
import User from "./pages/User/User";
import UserAccessLogPage from "./pages/User/UserAccessLogPage";

import StockPage from "./pages/Inventory/Stock/StockPage";
import SubCategoryPage from "./pages/Inventory/Category/SubCategoryPage";
import CategoryPage from "./pages/Inventory/Category/CategoryPage";
import AssignPage from "./pages/Inventory/Assign/AssignPage";

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

import RequestTable from "./components/Inventory/Assign/RequestTable";

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
import CategoryDetailPage from "./pages/Inventory/Category/CategoryDetailPage";
import AssetPage from "./pages/Inventory/Asset/AssetPage";
import StockBarcodesPage from "./pages/Inventory/Stock/StockBarcodesPage";
import EmployeeRequest from "./pages/Inventory/EmployeeRequest/EmployeeRequest";

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

      <Route path="Report" element={<PrivateRoute allowedRoles="all" />}>
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
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/InventoryDashboard" element={<InventoryDashboard />} />
      </Route>

      <Route path="/ITDashboard" element={<PrivateRoute allowedRoles="all" />}>
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

      <Route path="/employee" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/employee" element={<Employee />} />
      </Route>

      <Route
        path="/deleted-employee"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/deleted-employee" element={<DeletedEmployeePage />} />
      </Route>

      <Route path="/department" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/department" element={<Department />} />
      </Route>

      <Route path="/calendar" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/calendar" element={<Calendar />} />
      </Route>

      <Route path="/supplier" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/supplier" element={<Supplier />} />
      </Route>

      <Route path="/Tickets" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Tickets" element={<Tickets />} />
      </Route>

      <Route path="/Agents" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Agents" element={<Agents />} />
      </Route>

      <Route path="/Teams" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Teams" element={<Teams />} />
      </Route>

      <Route path="/Issues" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Issues" element={<Issues />} />
      </Route>

      <Route path="/Issues" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Issues" element={<Issues />} />
      </Route>

      <Route path="/RequestTable" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/RequestTable" element={<RequestTable />} />
      </Route>



      {/* Pages */}
      <Route path="/Category" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Category" element={<CategoryPage />} />
      </Route>

      <Route path="/Assign" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Assign" element={<AssignPage />} />
      </Route>

      <Route path="/SubCategory" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/SubCategory" element={<SubCategoryPage />} />
      </Route>

      <Route path="/Stock" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Stock" element={<StockPage />} />
      </Route>

      <Route path="/Asset" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/Asset" element={<AssetPage />} />
      </Route>

      <Route
        path="/categories/:id"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/categories/:id" element={<CategoryDetailPage />} />
      </Route>
      <Route
        path="/stock/:id/barcodes"
        element={<PrivateRoute allowedRoles="all" />}
      >
      <Route path="/stock/:id/barcodes" element={<StockBarcodesPage />} />
      </Route>

      <Route path="/EmployeeRequest" element={<PrivateRoute allowedRoles="all" /> }>
        <Route path="/EmployeeRequest" element={<EmployeeRequest />} />
      </Route>


      <Route
        path="/BuildingFloor"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/BuildingFloor" element={<BuildingFloor />} />
      </Route>
      <Route path="/AssignAsset" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/AssignAsset" element={<AssignAsset />} />
      </Route>
      <Route
        path="/FacilityAsset"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/FacilityAsset" element={<FacilityAsset />} />
      </Route>

      <Route
        path="/FacilityStock"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/FacilityStock" element={<FacilityStock />} />
      </Route>

      <Route path="/AssignAsset" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/AssignAsset" element={<AssignAsset />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;