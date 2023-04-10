import { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Nav, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import Button from "../Button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";

function StockTable() {
  const [stockProduct, setStockProduct] = useState<any[]>([]);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/Stock");
      setStockProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = async (stockId: number) => {
    // Get the stock to edit
    const stockToEdit = stockProduct.find(
      (stock) => stock.stockId === stockId
    );

    // Show a prompt to get the updated values
    // const updatedSubCategoryId = prompt(
    //   "Enter updated sub category id:",
    //   stockToEdit?.subCategoryId
    // );
    const updatePurchasedDate = prompt(
      "Enter updated purchased date:",
      stockToEdit?.purchasedDate
    );
    const updateCost = prompt("Enter updated cost:", stockToEdit?.cost);
    const updatedWarrantyExpiring = prompt(
      "Enter updated warranty expiring date:",
      stockToEdit?.warrantyExpiring
    );
    const updatedSupplierId = prompt(
      "Enter updated supplier id:",
      stockToEdit?.supplierId
    );
    const updatedAmount = prompt("Enter updated Amount:", stockToEdit?.amount);

    // Make the PUT request to update the stock
    try {
      const response = await axios.put(
        `http://localhost:5050/api/Stock/${stockId}`,
        {
          purchasedDate: updatePurchasedDate,
          cost: updateCost,
          warrantyExpiring: updatedWarrantyExpiring,
          supplierId: updatedSupplierId,
          amount: updatedAmount,
        }
      );
      console.log(response);
      fetchStocks(); // update the stocks list
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async (stockId: number) => {
    // Make the DELETE request to delete the stock
    try {
      const response = await axios.delete(
        `http://localhost:5050/api/Stock/${stockId}`
      );
      console.log(response);
      // Remove the deleted stock from the stocks list
      const updatedStocks = stockProduct.filter(
        (stock) => stock.stockId !== stockId
      );
      setStockProduct(updatedStocks);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <p
        style={{
          margin: "30px 0 30px 70px",
          color: "#482890",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Latest Stocks
      </p>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: "30px 0 0 65px" }}
      >
        <Fragment>
          <div>
            <Table
              className="table w-100 small table-borderless table-responsiv align-middle align-left"
              hover
              style={{ fontSize: "14px" }}
            >
              <thead className="thead-light">
                <tr style={{ color: "#482890" }}>
                  <th>StockId</th>
                  <th>SubCategoryId</th>
                  <th>PurchasedDate</th>
                  <th>Cost</th>
                  <th>WarrantyExpiring</th>
                  <th>SupplierId</th>
                  <th>Amount</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {stockProduct && stockProduct.length > 0 ? (
                  stockProduct.map((stock) => {
                    return (
                      <tr key={stock.stockId}>
                        <td>{stock.stockId}</td>
                        
                        <td className="text-secondary">
                          {stock.subCategoryId}
                        </td>
                        <td className="text-secondary">
                          {stock.purchasedDate}
                        </td>
                        <td className="text-secondary">
                          {stock.cost}
                        </td>
                        <td className="text-secondary">
                          {stock.warrantyExpiring}
                        </td>
                        <td className="text-secondary">
                          {stock.supplierId}
                        </td>
                        <td className="text-secondary">
                          {stock.amount}
                        </td>



                        <td>
                        <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: "482890", cursor: "pointer" }}
                            onClick={() => handleEdit(stock.stockId)}
                          />
                          &nbsp; &nbsp; &nbsp;
                          <FontAwesomeIcon
                            icon={faTrash}
                            style={{ color: "#FF615A", cursor: "pointer" }}
                            onClick={() => handleDelete(stock.stockId)}
                          />
                        </td>
                      </tr>
                    );
                  })
                ) : (
                  <tr>
                    <td colSpan={4}>No data available</td>
                  </tr>
                )}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default StockTable;
