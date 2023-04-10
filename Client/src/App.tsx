import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Authentication/Login";
import Home from "./pages/General/Home";
import User from "./pages/User/User";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";

import Tickets from "./pages/Support/Tickets";
import Agents from "./pages/Support/Agents";
import Teams from "./pages/Support/Teams";
import Issues from "./pages/Support/Issues";
import PrivateRoute from "./PrivateRoute";
import Employee from "./pages/Employee/Employee" ;
import Department from "./pages/Department/Department";
import Calendar from "./pages/General/Calendar";
import Supplier from "./pages/Supplier/Supplier";
import "./App.css";
import "./css/Buttons.css";

const App: React.FC = () => {
  return (
    <Router>
      
      <Routes>
      <Wrapper>
          <Route path="/" element={<Home />} />
          <Route path="/Tickets" element={<Tickets />} />
          <Route path="/Agents" element={<Agents />} />
          <Route path="/Teams" element={<Teams />} />
          <Route path="/Issues" element={<Issues />} />
        </Wrapper>
        <Route
          path="/"
          element={
            <Wrapper>
              <PrivateRoute />
            </Wrapper>
          }
        />

        {/* Temporary routes */}
        <Route
          path="/nav"
          element={
            <Wrapper>
              <Navbar />
            </Wrapper>
          }
        />

          
        <Route path="/login" element={<Login />} />

        <Route path="/user" element={<PrivateRoute />}>
          <Route
            path="/user"
            element={
              <Wrapper>
                <User />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/employee" element={<PrivateRoute />}>
          <Route
            path="/employee"
            element={
              <Wrapper>
                <Employee />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/department" element={<PrivateRoute />}>
          <Route
            path="/department"
            element={
              <Wrapper>
                <Department />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/calendar" element={<PrivateRoute />}>
          <Route
            path="/calendar"
            element={
              <Wrapper>
                <Calendar />
              </Wrapper>
            }
          />
        </Route>

        <Route path="/supplier" element={<PrivateRoute />}>
          <Route
            path="/supplier"
            element={
              <Wrapper>
                <Supplier />
              </Wrapper>
            }
          />
        </Route>


      </Routes>
    </Router>
  );
};

export default App;
