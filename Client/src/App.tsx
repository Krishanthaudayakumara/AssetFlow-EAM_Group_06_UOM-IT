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
import IssueTypeTable from "./components/Support/IssueTypeTable";
import TeamTable from "./components/Support/TeamTable";
import NewTeamForm from "./components/Support/NewTeamForm";
import ProfileImage from "./components/Support/ProfileImage";

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
        <Route path="/IssueTypeTable" element={<IssueTypeTable />} />
        <Route path="/TeamTable" element={<TeamTable />} />
        <Route path="/NewTeamForm" element={<NewTeamForm />} />
        
      </Routes>
      
       
      </Wrapper>
    </Router>
  );
};

export default App;
