import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

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

  console.log(theme);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <div className={`body ${theme === "dark" ? "dark-theme" : ""}`}>
              <Wrapper theme={theme} toggleTheme={toggleTheme}>
                <RoutesConfig />
              </Wrapper>
            </div>
          }
        />
      </Routes>
    </Router>
  );
};

export default App;
