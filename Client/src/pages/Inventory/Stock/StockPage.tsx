import React, { useState } from 'react';
import StockTable from '../../../components/Inventory/Stock/StockTable';
import StockModal from '../../../components/Inventory/Stock/StockModal';
import { Button } from 'react-bootstrap';
import { Stock } from '../../../types';

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
      <h1>Stock Page</h1>
      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add Stock
      </Button>
      <StockTable />
      <StockModal />
    </div>
  );
};

export default StockPage;
