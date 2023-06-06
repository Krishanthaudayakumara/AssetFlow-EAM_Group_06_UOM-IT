import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MyNavbar from "../../components/Navbar";
//import CategoryTable from "../../components/Inventory/Table/CategoryTable";
//import SubCategoryPopupForm from "../../components/Inventory/Form/SubCategoryPopupForm";
import EmployeeRequestTable from "../../components/Inventory/Table/EmployeeRequestTable";


const Asset: React.FC = () => {
  return (
    <Container>
      <div>
       {/* <SubCategoryPopupForm/> */}
       {<EmployeeRequestTable /> }

      </div>
    </Container>
  );
};

export default Asset;
