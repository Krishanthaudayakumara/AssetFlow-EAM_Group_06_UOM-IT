// StockPage.jsx
import React, { useState } from "react";
import StockTable from "../../../components/Inventory/Stock/StockTable";
import StockModal from "../../../components/Inventory/Stock/StockModal";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Stock } from "../../../types";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../../css/Table.css";

const StockPage: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const [stocks, setStocks] = useState<Stock[]>([]);

  const handleAddStock = (stock: Stock) => {
    setStocks([...stocks, stock]);
  };

  const handleDeleteStock = (stockId: number) => {
    const updatedStocks = stocks.filter((stock) => stock.id !== stockId);
    setStocks(updatedStocks);
  };

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <h2 className="table-page-heading">STOCK</h2>
          </Col>
          <Col md={3}>
            <StockModal />
          </Col>
        </Row>
        <div className="table-box-shadow"></div>
        <StockTable />
      </Container>
    </div>
  );
};

export default StockPage;
