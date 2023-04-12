import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MyNavbar from "../../components/Navbar";
import CategoryTable from "../../components/Inventory/Table/CategoryTable";
import SubCategoryPopupForm from "../../components/Inventory/Form/SubCategoryPopupForm";
import SubCategoryTable from "../../components/Inventory/Table/SubCategoryTable";


const Category: React.FC = () => {
  return (
    <Container>
      <div>
       <SubCategoryPopupForm/>
       {<SubCategoryTable /> }

      </div>
    </Container>
  );
};

export default Category;
