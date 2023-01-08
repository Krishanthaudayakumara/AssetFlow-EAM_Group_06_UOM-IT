import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Support_Agent from "./pages/Support/Support_Agent";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path = '/Support_Agent' element = {<Support_Agent/>}/>
      </Routes>
    </Router>
  );
};

export default App;
