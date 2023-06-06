import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Home from "./pages/General/Home";
import User from "./pages/User/User";
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
import "./App.css";
import "./css/Buttons.css";

import CategoryTable from "./components/Inventory/Table/CategoryTable";
import Category from "./pages/Inventory/Category";
import CategoryPopupForm from "./components/Inventory/Form/CategoryPopupForm";

import SubCategoryTable from "./components/Inventory/Table/SubCategoryTable";
import SubCategory from "./pages/Inventory/SubCategory";
import SubCategoryPopupForm from "./components/Inventory/Form/SubCategoryPopupForm";

import StockTable from "./components/Inventory/Table/StockTable";
import Stock from "./pages/Inventory/Stock";
import StockPopupForm from "./components/Inventory/Form/StockPopupForm";

import AsseTable from "./components/Inventory/Table/AssetTable";
import Asset from "./pages/Inventory/Asset";
//import AssetPopupForm from "./components/Inventory/Form/AssetPopupForm";

import EmployeeRequestTable from "./components/Inventory/Table/EmployeeRequestTable";
import EmployeeRequest from "./pages/Inventory/EmployeeRequest";
//import EmployeeRequestPopupForm from "./components/Inventory/Form/EmployeeRequestPopupForm";

import FacilityAsset from "./pages/Facility/FacilityAsset";
import FacilityStock from "./pages/Facility/FacilityStock";

import Report from "./pages/Report/Report";
import Dashboard from "./pages/Dashboard/Dashboard";
import FacilityDashboard from "./pages/Dashboard/FacilityDashboard";
import InventoryDashboard from "./pages/Dashboard/InventoryDashboard";
import ITDashboard from "./pages/Dashboard/ITDashboard";
import ReportHistory from "./components/Report/ReportHistory";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route
            path="/"
            element={
              <Wrapper>
                <Dashboard />
              </Wrapper>
            }
          />
        </Route>

        <Route path="Report" element={<PrivateRoute />}>
          "
          <Route
            path="/Report"
            element={
              <Wrapper>
                <Report />
              </Wrapper>
            }
          />
        </Route>
        <Route path="/FacilityDashboard" element={<PrivateRoute />}>
          <Route
            path="/FacilityDashboard"
            element={
              <Wrapper>
                <FacilityDashboard />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/InventoryDashboard" element={<PrivateRoute />}>
          <Route
            path="/InventoryDashboard"
            element={
              <Wrapper>
                <InventoryDashboard />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/ITDashboard" element={<PrivateRoute />}>
          <Route
            path="/ITDashboard"
            element={
              <Wrapper>
                <ITDashboard />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/ReportHistory" element={<PrivateRoute />}>
          <Route
            path="/ReportHistory"
            element={
              <Wrapper>
                <ReportHistory />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/user" element={<PrivateRoute />}>
          <Route
            path="/user"
            element={
              <Wrapper>
                <User />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/employee" element={<PrivateRoute />}>
          <Route
            path="/employee"
            element={
              <Wrapper>
                <Employee />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/department" element={<PrivateRoute />}>
          <Route
            path="/department"
            element={
              <Wrapper>
                <Department />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/calendar" element={<PrivateRoute />}>
          <Route
            path="/calendar"
            element={
              <Wrapper>
                <Calendar />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/supplier" element={<PrivateRoute />}>
          <Route
            path="/supplier"
            element={
              <Wrapper>
                <Supplier />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Tickets" element={<PrivateRoute />}>
          <Route
            path="/Tickets"
            element={
              <Wrapper>
                <Tickets />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Agents" element={<PrivateRoute />}>
          <Route
            path="/Agents"
            element={
              <Wrapper>
                <Agents />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Teams" element={<PrivateRoute />}>
          <Route
            path="/Teams"
            element={
              <Wrapper>
                <Teams />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Issues" element={<PrivateRoute />}>
          <Route
            path="/Issues"
            element={
              <Wrapper>
                <Issues />
              </Wrapper>
            }
          />
        </Route>

        {/* Pages */}
        <Route path="/Category" >
          <Route
            path="/Category"
            element={
              <Wrapper>
                <Category />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/SubCategory">
          <Route
            path="/SubCategory"
            element={
              <Wrapper>
                <SubCategory />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Stock">
          <Route
            path="/Stock"
            element={
              <Wrapper>
                <Stock />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Asset" >
          <Route
            path="/Asset"
            element={
              <Wrapper>
                <Asset />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/EmployeeRequest" >
          <Route
            path="/EmployeeRequest"
            element={
              <Wrapper>
                <EmployeeRequest />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/BuildingFloor" element={<PrivateRoute />}>
          <Route
            path="/BuildingFloor"
            element={
              <Wrapper>
                <BuildingFloor />
              </Wrapper>
            }
          />
        </Route>
        <Route path="/AssignAsset" element={<PrivateRoute />}>
          <Route
            path="/AssignAsset"
            element={
              <Wrapper>
                <AssignAsset />
              </Wrapper>
            }
          />
        </Route>
        <Route path="/FacilityAsset" element={<PrivateRoute />}>
          <Route
            path="/FacilityAsset"
            element={
              <Wrapper>
                <FacilityAsset />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/FacilityStock" element={<PrivateRoute />}>
          <Route
            path="/FacilityStock"
            element={
              <Wrapper>
                <FacilityStock />
              </Wrapper>
            }
          />
        </Route>
      </Routes>
    </Router>
  );
};

export default App;
