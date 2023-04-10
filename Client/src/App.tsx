import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import User from "./pages/User";
import Navbar from "./components/Navbar";
import Wrapper from "./components/DashWrapper";
import Sidebar from "./components/Sidebar";

import CategoryTable from "./components/Inventory/Table/CategoryTable";
import Category from "./pages/Inventory/Category";
import CategoryPopupForm from "./components/Inventory/Form/CategoryPopupForm";

import SubCategoryTable from "./components/Inventory/Table/SubCategoryTable";
import SubCategory from "./pages/Inventory/SubCategory";
import SubCategoryPopupForm from "./components/Inventory/Form/SubCategoryPopupForm";

import StockTable from "./components/Inventory/Table/StockTable";
import Stock from "./pages/Inventory/Stock";
import StockPopupForm from "./components/Inventory/Form/StockPopupForm";










const App: React.FC = () => {
  return (
    <Router>
      <Wrapper>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/user" element={<User />} />

          {/* Page Elements */}
          <Route path="/nav" element={<Navbar />} />
          <Route path="/sideBar" element={<Sidebar active={""} />} />
        





    
          {/* Tables */}
          <Route path="/CategoryTable" element={<CategoryTable/>} />
          <Route path="/SubCategoryTable" element={<SubCategoryTable/>} />
          <Route path="/StockTable" element={<StockTable/>} />

          {/* popupforms */}
          <Route path="/CategoryPopupForm" element={<CategoryPopupForm/>}/>
          <Route path="/SubCategoryPopupForm" element={<SubCategoryPopupForm/>}/>
          <Route path="/StockPopupForm" element={<StockPopupForm/>}/>
          
          
          {/* Pages */}
          <Route path="/Category" element={<Category />} />
          <Route path="/SubCategory" element={<SubCategory />} />
          <Route path="/Stock" element={<Stock />} />
          
        
      
         
        </Routes>
      </Wrapper>
    </Router>
  );
};

export default App;
