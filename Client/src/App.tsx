import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";

import SupportAgent from "./pages/Support/SupportAgent";
import AgentTable from "./components/Support/AgentTable";
import MyAssignmentsTable from "./components/Support/MyAssignmentsTable";
import ViewAgent from "./components/Support/ViewAgent";
import AgentTeam from "./pages/Support/AgentTeam";

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
      <Routes>
        <Route path="/" element={<Home />} />

        {/* Temporary routes */}
        <Route path="/nav" element={<Navbar />} />
        
        <Route path="/AgentTable" element={<AgentTable />} />
        <Route path="/MyAssignmentsTable" element={<MyAssignmentsTable />} />
        <Route path="/ViewAgent" element={<ViewAgent />} />

        <Route path="/login" element={<Login />} />
        <Route path="/user" element={<User />} />
        <Route path="/SupportAgent" element={<SupportAgent />} />
        <Route path="/AgentTeam" element={<AgentTeam />} />
      </Routes>
      
       
      </Wrapper>
    </Router>
  );
};

export default App;
