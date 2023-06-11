import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import jwtDecode from "jwt-decode";

import RoutesConfig from "./routes";
import Wrapper from "./components/DashWrapper";
import Login from "./pages/Authentication/Login";

const App: React.FC = () => {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setTheme(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const token = localStorage.getItem("token");
  let defaultDashboard: React.ReactElement;

  if (token) {
    const decodedToken: any = jwtDecode(token);
    const userRole = decodedToken.role;

    defaultDashboard = (
      <Wrapper theme={theme} toggleTheme={toggleTheme} userRoles={[userRole]}>
        <RoutesConfig />
      </Wrapper>
    );
  } else {
    defaultDashboard = <Login />;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/*" element={<div className={`body ${theme === "dark" ? "dark-theme" : ""}`}>{defaultDashboard}</div>} />
      </Routes>
    </Router>
  );
};

export default App;
