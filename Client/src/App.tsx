import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import PieChart from "./components/Dashboard/PieChart";
import Report from "./pages/Report";
import Dashboard from  "./pages/Dashboard";
import Support_Agent from "./pages/Support/Support_Agent";
import FacilityDashboard from "./pages/FacilityDashboard";
import BuildingFloor from "./pages/BuildingFloor";




import BasicExample from "./components/Inventory/Category_table";
const App: React.FC = () => {
  
  return (
    <Router>
      <Routes>


        <Route path="/" element={<Dashboard />} />

        {/* Temporary routes */}
        <Route path="/nav" element={<Navbar />} />
        <Route path="/side" element={<Sidebar />} />
        <Route path="/PieChart" element={<PieChart />} />

        <Route path="/login" element={<Login />} />
        <Route path="/Report" element={<Report/>}></Route>
        

        <Route path = '/Support' element = {<Support_Agent/>}/>
<Route path="/category_table"element={<BasicExample />} />
        <Route path="/user" element={<User />} />
      
        <Route path="/FacilityDashboard" element={<FacilityDashboard />} />
        <Route path="/facility" element={<BuildingFloor />} />
      
      
       
        

      </Routes>
    </Router>
  );

};

export default App;
