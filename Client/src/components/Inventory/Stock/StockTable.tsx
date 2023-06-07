import React, { useEffect, useState } from 'react';
import { getStock, deleteStock } from '../../../api/stockApi';

interface Stock {
  id: number;
  name: string;
  description: string;
}

const StockTable = () => {
  const [stocks, setStocks] = useState<Stock[]>([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await getStock();
      setStocks(response.data);
    } catch (error) {
      console.error('Error fetching stocks:', error);
    }
  };

  const handleDeleteStock = async (stockId: number) => {
    try {
      await deleteStock(stockId);
      fetchStocks();
    } catch (error) {
      console.error('Error deleting stock:', error);
    }
  };

  return (
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            <td>{stock.id}</td>
            <td>{stock.name}</td>
            <td>{stock.description}</td>
            <td>
              <button onClick={() => handleDeleteStock(stock.id)}>Delete</button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default StockTable;
