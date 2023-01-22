import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";
import Sidebar from "./components/Sidebar";

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />

          {/* Temporary routes */}
          <Route path="/nav" element={<Navbar />} />

          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;
