import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

import User from "./pages/User";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";

import Report from "./pages/Report";
import Dashboard from  "./pages/Dashboard";
import PieChart from "./components/Dashboard/PieChart";
import FacilityDashboard from "./pages/FacilityDashboard";
import InventoryDashboard from "./pages/InventoryDashboard";
import ITDashboard from "./pages/ITDashboard";

const App: React.FC = () => {
  
  return (
    <Router>
      <Routes>


        <Route path="/" element={<Dashboard />} />

        {/* Temporary routes */}
        <Route path="/nav" element={<Navbar />} />
        <Route path="/side" element={<Sidebar />} />
        
        

        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/Report" element={<Report/>}></Route>
        <Route path="/FacilityDashboard" element={<FacilityDashboard/>}></Route>
        <Route path="/InventoryDashboard" element={<InventoryDashboard/>}></Route>
        <Route path="/ITDashboard" element={<ITDashboard/>}></Route>
      </Routes>
    </Router>
  );

};

export default App;
