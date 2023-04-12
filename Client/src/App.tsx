import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Login from './pages/Login'

import User from './pages/User'
import Navbar from './components/Navbar'
import Wrapper from './components/DashWrapper'
import Report from './pages/Report/Report'
import Dashboard from './pages/Dashboard/Dashboard'
import FacilityDashboard from './pages/Dashboard/FacilityDashboard'
import InventoryDashboard from './pages/Dashboard/InventoryDashboard'
import ITDashboard from './pages/Dashboard/ITDashboard'
import ReportHistory from './components/Report/ReportHistory'

const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Dashboard />} />

          {/* Temporary routes */}

          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
          <Route path="/Report" element={<Report />}></Route>
          <Route path="/FacilityDashboard" element={<FacilityDashboard />}></Route>
          <Route path="/InventoryDashboard" element={<InventoryDashboard />}></Route>
          <Route path="/ITDashboard" element={<ITDashboard />}></Route>
          <Route path="/ReportHistory" element={<ReportHistory />}></Route>
          {/* Temporary routes */}
          <Route path="/nav" element={<Navbar />} />

          <Route path="/login" element={<Login />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </Wrapper>
    </Router>
  )
}

export default App
