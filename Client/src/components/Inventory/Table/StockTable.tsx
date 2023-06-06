import React, { useState, useEffect, Fragment } from "react";
import { Container, Row, Col, Nav, Table, Modal, Button, Form, Alert } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function StockTable() {


    // New state variable for error message
  const [errorMessage, setErrorMessage] = useState("");

  const [selectedSubCategoryType, setSelectedSubCategoryType] = useState("");
  const [subCategoryProduct, setSubCategoryProduct] = useState<any[]>([]);

  const [purchasedDate, setPurchasedDate] = useState<Date | null>(null);
  const [warrantyExpiring, setWarrantyExpiring] = useState<Date | null>(null);
  const [subCategories, setSubCategories] = useState<any[]>([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5087/api/SubCategory");
      setSubCategories(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategoryTypeChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSelectedSubCategoryType(event.target.value);
  };

  const [sProduct, setSProduct] = useState<any[]>([]);
  const [selectedSN, setSelectedSN] = useState<string>("");

  useEffect(() => {
    fetchS();
  }, []);

  const fetchS = async () => {
    try {
      const sProduct = await axios.get("http://localhost:5087/api/Suppliers");
      console.log(sProduct);
      setSProduct(sProduct.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSN(event.target.value);
  };

  const [stockProduct, setStockProduct] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editStock, setEditStock] = useState<any | null>(null);

  useEffect(() => {
    fetchStocks();
  }, []);

  const fetchStocks = async () => {
    try {
      const response = await axios.get("http://localhost:5087/api/Stock");
      setStockProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEdit = (stockId: number) => {
    // Find the stock to edit
    const stockToEdit = stockProduct.find((stock) => stock.stockId === stockId);
    setEditStock(stockToEdit);
    setPurchasedDate(new Date(stockToEdit.purchasedDate));
    setWarrantyExpiring(new Date(stockToEdit.warrantyExpiring));
    setShowModal(true);
  };

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [stockToDelete, setStockToDelete] = useState<any | null>(null);

  const handleDelete = (stockId: number) => {
    // Find the stock to delete
    const stockToDelete = stockProduct.find((stock) => stock.stockId === stockId);
    setStockToDelete(stockToDelete);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (stockToDelete) {
      // Make the DELETE request to delete the stock
      try {
        const response = await axios.delete(
          `http://localhost:5087/api/Stock/${stockToDelete.stockId}`
        );
        console.log(response);
        // Remove the deleted stock from the stocks list
        const updatedStocks = stockProduct.filter(
          (stock) => stock.stockId !== stockToDelete.stockId
        );
        setStockProduct(updatedStocks);
        setShowDeleteModal(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const cancelDelete = () => {
    setShowDeleteModal(false);
  };

  const handleModalClose = () => {
    setShowModal(false);
  };

  const handleModalSave = async () => {
    if (editStock) {
      // Get the updated values from the modal inputs
      const updatedSubCategoryType = document.getElementById(
        "subCategoryTypeInput"
      ) as HTMLSelectElement;
      const updatedCost = document.getElementById(
        "costInput"
      ) as HTMLInputElement;
      const updatedSupplierName = document.getElementById(
        "supplierNameInput"
      ) as HTMLSelectElement;
      const updatedAmount = document.getElementById(
        "amountInput"
      ) as HTMLInputElement;


      const costValue = parseFloat(updatedCost.value);
      const amountValue = parseFloat(updatedAmount.value);
  
      // Validate the input fields
      if (
        !updatedSubCategoryType.value ||
        !purchasedDate ||
        !updatedCost.value ||
        !warrantyExpiring ||
        !updatedSupplierName.value ||
        !updatedAmount.value
      ) {
        setErrorMessage("Please fill in all the fields.");
        return;
      }

      if (isNaN(costValue)) {
        setErrorMessage("Cost must be a Number.");
        return;
      }
      if (isNaN(amountValue)) {
        setErrorMessage("Amount must be a Number.");
        return;
      }

      if( updatedSupplierName.value=="Choose a supplier ..."){
        setErrorMessage("Please Choose a Supplier.");
        return;
      }

      if( updatedSubCategoryType.value=="Choose a subcategory ..."){
        setErrorMessage("Please Choose a SubCategory.");
        return;
      }

     

      if(costValue<=0 ){
        setErrorMessage("Cost Must Be Greater than zero.");
        return;
      }
  
      


      if(amountValue<=0 ){
        setErrorMessage("Amount Must Be Greater than zero.");
        return;
      }

      if(purchasedDate>=warrantyExpiring){
        setErrorMessage("Warranty Expiring date is not valid.");
        return;
      }
  
      // Make the PUT request to update the stock
      try {
        const response = await axios.put(
          `http://localhost:5087/api/Stock/${editStock.stockId}`,
          {
            // Include the updated values in the request payload
            subCategoryType: updatedSubCategoryType.value,
            purchasedDate: purchasedDate,
            cost: updatedCost.value,
            warrantyExpiring: warrantyExpiring,
            supplierName: updatedSupplierName.value,
            amount: updatedAmount.value,
          }
        );
        console.log(response);
        fetchStocks(); // Update the stocks list
        setShowModal(false);
      } catch (error) {
        console.log(error);
      }
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
              className="table w-100 small table-borderless table-responsive align-middle align-left"
              hover
              style={{ fontSize: "14px" }}
            >
              <thead className="thead-light">
                <tr style={{ color: "#482890" }}>
                  <th>StockId</th>
                  <th>SubCategory</th>
                  <th>PurchasedDate</th>
                  <th>Cost</th>
                  <th>WarrantyExpiring</th>
                  <th>Supplier</th>
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
                          {stock.subCategoryType}
                        </td>
                        <td className="text-secondary">
                          {new Date(stock.purchasedDate).toLocaleDateString()} {/* Format the date */}
                        </td>
                        <td className="text-secondary">{stock.cost}</td>
                        <td className="text-secondary">
                          {new Date(stock.warrantyExpiring).toLocaleDateString()} {/* Format the date */}
                        </td>
                        <td className="text-secondary">
                          {stock.supplierName}
                        </td>
                        <td className="text-secondary">{stock.amount}</td>
                        <td>
                          <FontAwesomeIcon
                            icon={faPen}
                            style={{ color: "#482890", cursor: "pointer" }}
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

      {/* Delete Confirmation Modal */}
      <Modal show={showDeleteModal} onHide={cancelDelete}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete the stock?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={cancelDelete}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={handleModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {errorMessage && (
          <Alert variant="danger">{errorMessage}</Alert>
        )}
          <Container>
            <Form>
              <Row>
                <Col>
                <Form.Group controlId="subCategoryTypeInput">
                  <Form.Label>SubCategory:</Form.Label>
                  <Form.Control as="select" defaultValue={editStock?.subCategoryType}>
                    <option>Choose a subcategory ...</option>
                    {subCategories.map((subcategory) => (
                      <option key={subcategory.subCategoryId} value={subcategory.subCategoryType}>
                        {subcategory.subCategoryType}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                </Col>
                <Col>
                  <Form.Group controlId="purchasedDateInput">
                    <Form.Label>Purchased Date:</Form.Label>
                    <br />
                    <DatePicker
                      selected={purchasedDate}
                      onChange={(date: Date | null) => setPurchasedDate(date)}
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="costInput">
                    <Form.Label>Cost:</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={editStock?.cost}
                    />
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="warrantyExpiringInput">
                    <Form.Label>Warranty Expiring:</Form.Label>
                    <br />
                    <DatePicker
                      selected={warrantyExpiring}
                      onChange={(date: Date | null) =>
                        setWarrantyExpiring(date)
                      }
                      dateFormat="yyyy-MM-dd"
                      className="form-control"
                    />
                  </Form.Group>
                </Col>
              </Row>
              <Row>
                <Col>
                  <Form.Group controlId="supplierNameInput">
                    <Form.Label>Supplier:</Form.Label>
                    <Form.Control
                      as="select"
                      defaultValue={editStock?.supplierName}
                    >
                      <option>Choose a supplier ...</option>
                      {sProduct.map((s) => (
                        <option key={s.name} value={s.name}>
                          {s.name}
                        </option>
                      ))}
                    </Form.Control>
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Group controlId="amountInput">
                    <Form.Label>Amount:</Form.Label>
                    <Form.Control
                      type="text"
                      defaultValue={editStock?.amount}
                    />
                  </Form.Group>
                </Col>
              </Row>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleModalSave}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default StockTable;
