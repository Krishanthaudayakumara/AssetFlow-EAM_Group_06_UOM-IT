import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MyNavbar from "../../components/Navbar";
import CategoryTable from "../../components/Inventory/Table/CategoryTable";
import CategoryPopupForm from "../../components/Inventory/Form/CategoryPopupForm";
import CategoryCard from "../../components/Inventory/Card/CategoryCard";

const Category: React.FC = () => {
  return (
    <Container>
      <div>
       <CategoryPopupForm/>
       <CategoryTable />
       

      </div>
    </Container>
  );
};

export default Category;
