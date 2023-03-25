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

import AgentTable from "./components/Support/Table/AgentTable";
import MyAssignmentsTable from "./components/Support/MyAssignmentsTable";
import ViewAgent from "./components/Support/ViewAgent";
import AgentTeam from "./pages/Support/Teams";
import IssueTypeTable from "./components/Support/Table/IssueTypeTable";
import TeamTable from "./components/Support/Table/TeamTable";
import NewTeamForm from "./components/Support/NewTeamForm";

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

          <Route path="/AgentTable" element={<AgentTable />} />
          <Route path="/MyAssignmentsTable" element={<MyAssignmentsTable />} />
          <Route path="/ViewAgent" element={<ViewAgent />} />
          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
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
