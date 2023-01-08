import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import Support_Agent from "./pages/Support/Support_Agent";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>

        <Route path="/" element={<Home />} />

        {/* Temporary routes */}
        <Route path="/nav" element={<Navbar />} />
        <Route path="/side" element={<Sidebar />} />

        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path = '/Support_Agent' element = {<Support_Agent/>}/>
      </Routes>
    </Router>
  );
};

export default App;
