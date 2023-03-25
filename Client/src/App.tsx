import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FacilityDashboard from "./pages/FacilityDashboard";
import BuildingFloor from "./pages/BuildingFloor";



import User from "./pages/User";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";
import Sidebar from "./components/Sidebar";
import AssignItems from "./components/Facility/Assigneditemdata";

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/BuildingFloor" element={<BuildingFloor />} />
          <Route path="/FacilityDashboard" element={<FacilityDashboard />} />
          




        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;
