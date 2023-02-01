import React, { useState } from "react";
import { Button, Modal, ModalBody } from "react-bootstrap";
import AddStockForm from "../../components/Inventory/AddStockForm";

const AddStock = () => {
    const [New,setNew] = useState(false)
    const handleNew = () => setNew(true)
    return (
      <div>
          <Button onClick={handleNew} className="btn btn- success" data-toggle="modal">Add Stock</Button>
        <Modal>
          <Modal.Header>
            <Modal.Title>New stock</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AddStockForm />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="success" type="submit"></Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  };
  export default AddStock;
  