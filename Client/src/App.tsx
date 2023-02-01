import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import AssignsTabl from "./components/Inventory/AssignsTable";
import Assigns from "./pages/Inventory/Assigns";
import AddStock from "./pages/Inventory/Stock";
const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* Temporary routes */}
        <Route path="/nav" element={<Navbar />} />
        <Route path="/side" element={<Sidebar />} />
        <Route path="/AssignTable"element={<AssignsTabl />} />
        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />

        <Route path="/Assigns" element={<Assigns />} />
        <Route path="/AddStock" element={<AddStock />} />
      
      </Routes>
    </Router>
  );
};

export default App;
