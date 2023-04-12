import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FacilityDashboard from "./pages/Facility/FacilityDashboard";
import BuildingFloor from "./pages/Facility/BuildingFloor";



import User from "./pages/User";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";
import Sidebar from "./components/Sidebar";

import FacilityAsset from "./pages/Facility/FacilityAsset";
import FacilityStock from "./pages/Facility/FacilityStock";

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />

          <Route path="/login" element={<Login />} />
          <Route path="/BuildingFloor" element={<BuildingFloor />} />
          <Route path="/FacilityDashboard" element={<FacilityDashboard />} />
          <Route path="/FacilityAsset" element={<FacilityAsset/>} />
          <Route path="/FacilityStock" element={<FacilityStock/>} />


          




        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;
