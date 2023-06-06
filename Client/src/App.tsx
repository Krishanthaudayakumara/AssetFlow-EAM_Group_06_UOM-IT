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
import MyTickets from "./pages/Support/MyTickets";
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

        <Route path="/" >
          <Route
            path="/"
            element={
              <Wrapper>
                <Dashboard />
              </Wrapper>
            }
          />
        </Route>

        <Route path="Report">
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

        <Route path="/ITDashboard" >
          <Route
            path="/ITDashboard"
            element={
              <Wrapper>
                <ITDashboard />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/ReportHistory" >
          <Route
            path="/ReportHistory"
            element={
              <Wrapper>
                <ReportHistory />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/user" >
          <Route
            path="/user"
            element={
              <Wrapper>
                <User />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/employee" >
          <Route
            path="/employee"
            element={
              <Wrapper>
                <Employee />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/department" >
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

        <Route path="/Tickets" >
          <Route
            path="/Tickets"
            element={
              <Wrapper>
                <Tickets />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Agents">
          <Route
            path="/Agents"
            element={
              <Wrapper>
                <Agents />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Teams" >
          <Route
            path="/Teams"
            element={
              <Wrapper>
                <Teams />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/Issues" >
          <Route
            path="/Issues"
            element={
              <Wrapper>
                <Issues />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/MyTickets" >
          <Route
            path="/MyTickets"
            element={
              <Wrapper>
                <MyTickets />
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

        <Route path="/SubCategory" >
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

        <Route path="/BuildingFloor">
          <Route
            path="/BuildingFloor"
            element={
              <Wrapper>
                <BuildingFloor />
              </Wrapper>
            }
          />
        </Route>
        <Route path="/AssignAsset" >
          <Route
            path="/AssignAsset"
            element={
              <Wrapper>
                <AssignAsset />
              </Wrapper>
            }
          />
        </Route>
        <Route path="/FacilityAsset" >
          <Route
            path="/FacilityAsset"
            element={
              <Wrapper>
                <FacilityAsset />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/FacilityStock" >
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
