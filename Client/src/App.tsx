import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";

import Tickets from "./pages/Support/Tickets";
import Agents from "./pages/Support/Agents";
import Teams from "./pages/Support/Teams";
import Issues from "./pages/Support/Issues";

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/Agents" element={<Agents />} />
          <Route path="/Teams" element={<Teams />} />
          <Route path="/Issues" element={<Issues />} />

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
