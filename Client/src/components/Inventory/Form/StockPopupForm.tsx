import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form, Alert } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function AddStock() {
  const [sProduct, setSProduct] = useState<any[]>([]);
  const [selectedSN, setSelectedSN] = useState<string>("");

  useEffect(() => {
    fetchS();
  }, []);

  const fetchS = async () => {
    try {
      const sProduct = await axios.get("http://localhost:5087/api/Suppliers");
      setSProduct(sProduct.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSNChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSN(event.target.value);
  };

  const [show, setShow] = useState(false);
  const [error, setError] = useState<string>("");

  const handleClose = () => {
    setShow(false);
    setError("");
  };

  const handleShow = () => {
    setShow(true);
    setError("");
  };

  const [purchasedDate, setPurchasedDate] = useState<Date | null>(null);
  const [warrantyExpiring, setWarrantyExpiring] = useState<Date | null>(null);
  const [selectedSubCategoryType, setSelectedSubCategoryType] = useState<string>("");
  const [subCategoryProduct, setSubCategoryProduct] = useState<any[]>([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5087/api/SubCategory");
      setSubCategoryProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategoryTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubCategoryType(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    // Validate form fields
    const subCategoryType = event.currentTarget.subCategoryType.value;
    const purchasedDate = event.currentTarget.purchasedDate.value;
    const cost = event.currentTarget.cost.value;
    const warrantyExpiring = event.currentTarget.warrantyExpiring.value;
    const supplierName = event.currentTarget.sN.value;
    const amount = event.currentTarget.amount.value;

    if (!subCategoryType || !purchasedDate || !cost || !warrantyExpiring || !supplierName || !amount) {
      setError("Please fill in all the required fields.");
      return;
    }

    if (subCategoryType=="Choose an existing subcategory ...") {
      setError("Please Choose an existing subcategory ....");
      return;
    }
    if (supplierName=="Choose a supplier ...") {
      setError("Please Choose a supplier ...");
      return;
    }

    if (isNaN(Number(cost)) || isNaN(Number(amount))) {
      setError("Cost and amount must be numeric values.");
      return;
    }

    if (Number(cost)<=0 || Number(amount)<=0) {
      setError("Cost and amount must be Greater than zero.");
      return;
    }

    const data = {
      subCategoryType,
      purchasedDate,
      cost,
      warrantyExpiring,
      supplierName,
      amount,
    };

    try {
      const response = await axios.post("http://localhost:5087/api/Stock", data);
      console.log(response);
      handleClose(); // close the modal
      window.location.reload(); // reload the page
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Add Stock
      </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stock</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          <Form onSubmit={handleSubmit}>
            <Form.Group>
              <Form.Label>SubCategory</Form.Label>
              <Form.Control as="select" name="subCategoryType" value={selectedSubCategoryType} onChange={handleSubCategoryTypeChange}>
                <option>Choose an existing subcategory ...</option>
                {subCategoryProduct.map((subcategory) => (
                  <option key={subcategory.subCategoryType} value={subcategory.subCategoryType}>
                    {subcategory.subCategoryType}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>PurchasedDate</Form.Label>
              <DatePicker
                name="purchasedDate"
                selected={purchasedDate}
                onChange={(date: Date) => setPurchasedDate(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select purchase date"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Cost</Form.Label>
              <Form.Control type="text" name="cost" placeholder="Enter cost" />
            </Form.Group>

            <Form.Group>
              <Form.Label>WarrantyExpiring</Form.Label>
              <DatePicker
                name="warrantyExpiring"
                selected={warrantyExpiring}
                onChange={(date: Date) => setWarrantyExpiring(date)}
                dateFormat="yyyy-MM-dd"
                placeholderText="Select date"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Supplier</Form.Label>
              <Form.Control as="select" name="sN" value={selectedSN} onChange={handleSNChange} required>
                <option>Choose a supplier ...</option>
                {sProduct.map((s) => (
                  <option key={s.name} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>

            <Form.Group>
              <Form.Label>Amount</Form.Label>
              <Form.Control type="text" name="amount" placeholder="Enter amount" />
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddStock;
