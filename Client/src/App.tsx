import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import FacilityDashboard from "./pages/FacilityDashboard";
import BuildingFloor from "./pages/BuildingFloor";




const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/FacilityDashboard" element={<FacilityDashboard />} />
        <Route path="/BuildingFloor" element={<BuildingFloor />} />
      
      
       
        

      </Routes>
    </Router>
  );
};

export default App;
