import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import RoutesConfig from "./routes";
import Wrapper from "./components/DashWrapper";

const App: React.FC = () => {
  return (
    <Router>
    <Wrapper>
      <RoutesConfig />
    </Wrapper>
  </Router>
  );
};

export default App;
