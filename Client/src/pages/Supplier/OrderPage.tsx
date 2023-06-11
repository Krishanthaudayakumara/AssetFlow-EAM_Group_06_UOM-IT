import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import OrderTable from "../../components/SupplyChain/OrderTable";
import { checkAndCreateOrder } from "../../api/orderApi";
import { Modal, Button } from "react-bootstrap";

const OrderPage: React.FC = () => {
  const [successModalVisible, setSuccessModalVisible] = useState(false);

  const handleCheckAndCreateOrder = async () => {
    try {
      await checkAndCreateOrder();
      setSuccessModalVisible(true);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <div>
      <h1>Order Page</h1>
      <Button onClick={handleCheckAndCreateOrder}>
        Check and Create Order
      </Button>

      <OrderTable />

      {/* Success Modal */}
      <Modal
        show={successModalVisible}
        onHide={() => setSuccessModalVisible(false)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Order Created Successfully</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Modal content */}
          <p>Order has been created successfully.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={() => setSuccessModalVisible(false)}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default OrderPage;
