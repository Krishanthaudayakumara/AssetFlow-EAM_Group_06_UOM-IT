import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MyNavbar from "../../components/Navbar";
//import CategoryTable from "../../components/Inventory/Table/CategoryTable";
//import SubCategoryPopupForm from "../../components/Inventory/Form/SubCategoryPopupForm";
import AssetTable from "../../components/Inventory/Table/AssetTable";


const Asset: React.FC = () => {
  return (
    <Container>
      <div>
       {/* <SubCategoryPopupForm/> */}
       {<AssetTable /> }

      </div>
    </Container>
  );
};

export default Asset;
