import axios from "axios";
import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


function AddStock() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [purchasedDate, setPurchasedDate] = useState<Date | null>(null);
  const [warrantyExpiring, setWarrantyExpiring] = useState<Date | null>(null);

  const [selectedSubCategoryId, setSelectedSubCategoryId] = useState<string>("");
  const [subCategoryProduct, setSubCategoryProduct] = useState<any[]>([]);

  useEffect(() => {
    fetchSubCategories();
  }, []);

  const fetchSubCategories = async () => {
    try {
      const response = await axios.get("http://localhost:5050/api/SubCategory");
      setSubCategoryProduct(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubCategoryIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedSubCategoryId(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const data = {
      subCategoryId: event.currentTarget.subCategoryId.value,
      purchasedDate: event.currentTarget.purchasedDate.value,
      cost: event.currentTarget.cost.value,
      warrantyExpiring: event.currentTarget.warrantyExpiring.value,
      supplierId: event.currentTarget.supplierId.value,
      amount: event.currentTarget.amount.value,

 
    };


    try {
      const response = await axios.post("http://localhost:5050/api/Stock", data);
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
          <Form onSubmit={handleSubmit}>
          <Form.Group>
              <Form.Label>SubCategory id</Form.Label>
              <Form.Control as="select" name="subCategoryId" value={selectedSubCategoryId} onChange={handleSubCategoryIdChange}>
                <option>Choose an existing subcategory id...</option>
                {subCategoryProduct.map((subcategory) => (
                  <option key={subcategory.subCategoryId} value={subcategory.subCategoryId}>{subcategory.id}</option>
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
              <Form.Label>SupplierId</Form.Label>
              <Form.Control type="text" name="supplierId" placeholder="Enter supplier id" />
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
