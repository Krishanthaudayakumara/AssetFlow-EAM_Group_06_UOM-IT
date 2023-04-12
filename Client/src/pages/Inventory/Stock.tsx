import React from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import Sidebar from "../../components/Sidebar";
import MyNavbar from "../../components/Navbar";
import StockTable from "../../components/Inventory/Table/StockTable";
import StockPopupForm from "../../components/Inventory/Form/StockPopupForm";


const Stock: React.FC = () => {
  return (
    <Container>
      <div>
        <StockPopupForm/>
        <StockTable />

      </div>
    </Container>
  );
};

export default Stock;
