import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Home from "./pages/General/Home";
import User from "./pages/User/User";
import UserAccessLogPage from "./pages/User/UserAccessLogPage";

import StockPage from "./pages/Inventory/Stock/StockPage";
import SubCategoryPage from "./pages/Inventory/Category/SubCategoryPage";
import CategoryPage from "./pages/Inventory/Category/CategoryPage";

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
import CategoryDetailPage from "./pages/Inventory/Category/CategoryDetailPage";
import AssetPage from "./pages/Inventory/Asset/AssetPage";
import StockBarcodesPage from "./pages/Inventory/Stock/StockBarcodesPage";
import EmployeeRequest from "./pages/Inventory/EmployeeRequest/EmployeeRequest";
import SupplyChainPage from "./pages/Supplier/SupplyChain";
import OrderPage from "./pages/Supplier/OrderPage";
import ExternalWorkersPage from "./pages/Employee/ExternalWorkersPage";
import NotificationCenter from "./pages/Notification/NotificationCenter";
import ExternalEmployeeTask from "./pages/Facility/ExternalEmployeeTask";
import CleaningStaff from "./pages/Facility/CleaningStaff";
import { UserRole } from "./enum";
import Assign from "./pages/Dashboard/Assign";

const RoutesConfig: React.FC = () => {
  const token = localStorage.getItem("token");
  let defaultDashboard: React.ReactElement;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken.role;
    if (userRole === "admin") {
      defaultDashboard = <Dashboard />;
    } else if (userRole === "facilityManager") {
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

  const Management: string[] = [
    "manager",
    "admin",
    "facilityManager",
    "inventoryManager",
    "supportManager",
  ];
  const Facility: string[] = ["manager", "admin", "facilityManager"];
  const Inventory: string[] = ["manager", "admin", "inventoryManager"];
  const SupportManager: string[] = ["manager", "admin", "supportManager"];
  const AgentTeam: string[] = ["manager", "admin", "supportManager", "agent"];
  const ManagerOnly: string[] = ["manager", "admin"];
  const Admin: string[] = ["admin"];
  return (
    <Routes>
      <Route path="/" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/" element={defaultDashboard} />
      </Route>

      <Route path="Report" element={<PrivateRoute allowedRoles={Management} />}>
        <Route path="/Report" element={<Report />} />
      </Route>
      <Route
        path="/FacilityDashboard"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/FacilityDashboard" element={<FacilityDashboard />} />
      </Route>

      <Route
        path="/InventoryDashboard"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/InventoryDashboard" element={<InventoryDashboard />} />
      </Route>

      <Route
        path="/ITDashboard"
        element={<PrivateRoute allowedRoles={SupportManager} />}
      >
        <Route path="/ITDashboard" element={<ITDashboard />} />
      </Route>

      <Route
        path="/ReportHistory"
        element={<PrivateRoute allowedRoles={Management} />}
      >
        <Route path="/ReportHistory" element={<ReportHistory />} />
      </Route>

      <Route path="/profile" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      <Route path="/user" element={<PrivateRoute allowedRoles={Admin} />}>
        <Route path="/user" element={<User />} />
      </Route>

      <Route
        path="/deleted-users"
        element={<PrivateRoute allowedRoles={Admin} />}
      >
        <Route path="/deleted-users" element={<DeletedUsersPage />} />
      </Route>

      <Route
        path="/users/:userId/access-log"
        element={<PrivateRoute allowedRoles={Admin} />}
      >
        <Route
          path="/users/:userId/access-log"
          element={<UserAccessLogPage />}
        />
      </Route>

      <Route
        path="/employee"
        element={<PrivateRoute allowedRoles={ManagerOnly} />}
      >
        <Route path="/employee" element={<Employee />} />
      </Route>

      <Route
        path="/deleted-employee"
        element={<PrivateRoute allowedRoles={ManagerOnly} />}
      >
        <Route path="/deleted-employee" element={<DeletedEmployeePage />} />
      </Route>

      <Route
        path="/externel-worker"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/externel-worker" element={<ExternalWorkersPage />} />
      </Route>

      <Route
        path="/department"
        element={<PrivateRoute allowedRoles={ManagerOnly} />}
      >
        <Route path="/department" element={<Department />} />
      </Route>

      <Route path="/calendar" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/calendar" element={<Calendar />} />
      </Route>

      <Route
        path="/supplier"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/supplier" element={<Supplier />} />
      </Route>

      <Route
        path="/supply-chain"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/supply-chain" element={<SupplyChainPage />} />
      </Route>

      <Route
        path="/supply-orders"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/supply-orders" element={<OrderPage />} />
      </Route>

      <Route
        path="/notifications"
        element={<PrivateRoute allowedRoles={ManagerOnly} />}
      >
        <Route path="/notifications" element={<NotificationCenter />} />
      </Route>

      <Route
        path="/Tickets"
        element={<PrivateRoute allowedRoles={AgentTeam} />}
      >
        <Route path="/Tickets" element={<Tickets />} />
      </Route>

      <Route
        path="/Agents"
        element={<PrivateRoute allowedRoles={SupportManager} />}
      >
        <Route path="/Agents" element={<Agents />} />
      </Route>

      <Route path="/Teams" element={<PrivateRoute allowedRoles={AgentTeam} />}>
        <Route path="/Teams" element={<Teams />} />
      </Route>

      <Route
        path="/Issues"
        element={<PrivateRoute allowedRoles={SupportManager} />}
      >
        <Route path="/Issues" element={<Issues />} />
      </Route>

      <Route path="/MyTickets" element={<PrivateRoute allowedRoles="all" />}>
        <Route path="/MyTickets" element={<MyTickets />} />
      </Route>

      {/* Pages */}
      <Route
        path="/Category"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/Category" element={<CategoryPage />} />
      </Route>

      <Route
        path="/SubCategory"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/SubCategory" element={<SubCategoryPage />} />
      </Route>

      <Route path="/Stock" element={<PrivateRoute allowedRoles={Inventory} />}>
        <Route path="/Stock" element={<StockPage />} />
      </Route>

      <Route path="/Asset" element={<PrivateRoute allowedRoles={Inventory} />}>
        <Route path="/Asset" element={<AssetPage />} />
      </Route>

      <Route
        path="/categories/:id"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/categories/:id" element={<CategoryDetailPage />} />
      </Route>
      <Route
        path="/stock/:id/barcodes"
        element={<PrivateRoute allowedRoles={Inventory} />}
      >
        <Route path="/stock/:id/barcodes" element={<StockBarcodesPage />} />
      </Route>

      <Route
        path="/EmployeeRequest"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/EmployeeRequest" element={<EmployeeRequest />} />
      </Route>

      <Route
        path="/EmployeeRequest"
        element={<PrivateRoute allowedRoles="all" />}
      >
        <Route path="/EmployeeRequest" element={<EmployeeRequest />} />
      </Route>

      <Route
        path="/BuildingFloor"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/BuildingFloor" element={<BuildingFloor />} />
      </Route>

      <Route
        path="/AssignAsset"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/AssignAsset" element={<AssignAsset />} />
      </Route>
      <Route path="/Assign" element={<PrivateRoute allowedRoles={Inventory} />}>
        <Route path="/Assign" element={<Assign />} />
      </Route>
      <Route
        path="/FacilityAsset"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/FacilityAsset" element={<FacilityAsset />} />
      </Route>

      <Route
        path="/FacilityStock"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/FacilityStock" element={<FacilityStock />} />
      </Route>

      <Route
        path="/AssignAsset"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/AssignAsset" element={<AssignAsset />} />
      </Route>

      <Route
        path="/ExternalEmployeeTask"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route
          path="/ExternalEmployeeTask"
          element={<ExternalEmployeeTask />}
        />
      </Route>

      <Route
        path="/CleaningStaff"
        element={<PrivateRoute allowedRoles={Facility} />}
      >
        <Route path="/CleaningStaff" element={<CleaningStaff />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
