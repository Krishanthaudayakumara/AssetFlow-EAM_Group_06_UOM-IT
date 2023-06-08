import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getStock, deleteStock } from '../../../api/stockApi';
import { Table, Button } from 'react-bootstrap';

interface Stock {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
  category: {
    name: string;
  };
  subCategory: {
    name: string;
  };
  supplier: {
    name: string;
  };
  cost: number;
  arrivalDate: string;
  quantity: number;
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
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Category</th>
          <th>Subcategory</th>
          <th>Supplier</th>
          <th>Cost</th>
          <th>Arrival Date</th>
          <th>Count</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {stocks.map((stock) => (
          <tr key={stock.id}>
            <td>{stock.id}</td>
            <td>
              <img src={stock.imageUrl} alt={stock.name} style={{ height: '100px' }} />
            </td>
            <td>{stock.name}</td>
            <td>{stock.description}</td>
            <td>{stock.category?.name}</td>
            <td>{stock.subCategory?.name}</td>
            <td>{stock.supplier?.name}</td>
            <td>{stock.cost}</td>
            <td>{stock.arrivalDate}</td>
            <td>{stock.quantity}</td>
            <td>
              <Button variant="danger" onClick={() => handleDeleteStock(stock.id)}>
                Delete
              </Button>
              <Link to={`/stock/${stock.id}/barcodes`}>
                <Button variant="primary">
                  <i className="bi bi-barcode"></i> Barcodes
                </Button>
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default StockTable;
