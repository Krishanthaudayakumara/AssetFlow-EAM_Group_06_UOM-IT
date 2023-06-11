import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button, Table, Modal } from "react-bootstrap";
import {
  BsFillTrashFill,
  BsCheck,
  BsCheckCircleFill,
} from "react-icons/bs";
import {
  getOrders,
  deleteOrder,
  approveOrder,
  completeOrder,
} from "../../api/orderApi";
import { Image } from "react-bootstrap";
import { getSupplyChainById } from "../../api/supplyChainApi";

const OrderTable: React.FC = () => {
  const [orders, setOrders] = useState<any[]>([]);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [approveModalVisible, setApproveModalVisible] = useState(false);
  const [completeModalVisible, setCompleteModalVisible] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<number | null>(null);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await getOrders();
      const ordersWithSupplyChainData: any[] = await Promise.all(
        response.data.map(async (order: any) => {
          const supplyChain = await getSupplyChainById(order.supplyChainId);
          return {
            ...order,
            supplierName: supplyChain.supplier.name,
            supplyChainImage: supplyChain.assetImage,
            assetName: supplyChain.assetName,
          };
        })
      );
      setOrders(ordersWithSupplyChainData);
    } catch (error) {
      // Handle error
    }
  };

  const handleDeleteOrder = async (orderId: number) => {
    setSelectedOrderId(orderId);
    setDeleteModalVisible(true);
  };

  const handleApproveOrder = async (orderId: number) => {
    setSelectedOrderId(orderId);
    setApproveModalVisible(true);
  };

  const handleCompleteOrder = async (orderId: number) => {
    setSelectedOrderId(orderId);
    setCompleteModalVisible(true);
  };

  const confirmDeleteOrder = async () => {
    try {
      if (selectedOrderId) {
        await deleteOrder(selectedOrderId);
        fetchOrders();
      }
      setDeleteModalVisible(false);
    } catch (error) {
      // Handle error
    }
  };

  const confirmApproveOrder = async () => {
    try {
      if (selectedOrderId) {
        await approveOrder(selectedOrderId);
        fetchOrders();
      }
      setApproveModalVisible(false);
    } catch (error) {
      // Handle error
    }
  };

  const confirmCompleteOrder = async () => {
    try {
      if (selectedOrderId) {
        await completeOrder(selectedOrderId);
        fetchOrders();
      }
      setCompleteModalVisible(false);
    } catch (error) {
      // Handle error
    }
  };

  return (
    <>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th></th>
            <th>Asset name</th>
            <th>Supplier</th>
            <th>Quantity</th>
            <th>Status</th>
            <th>Completed</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order: any) => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <Image src={order.supplyChainImage} alt="Asset" height={50} />
              </td>
              <td>{order.assetName}</td>
              <td>{order.supplierName}</td>
              <td>{order.quantity}</td>
              <td>{order.status}</td>
              <td>
                {order.isCompleted ? (
                  <BsCheckCircleFill color="green" />
                ) : (
                  <BsCheckCircleFill color="red" />
                )}
              </td>
              <td>
                <Button
                  variant="danger"
                  onClick={() => handleDeleteOrder(order.id)}
                >
                  <BsFillTrashFill />
                  Delete
                </Button>
                <Button
                  variant="success"
                  onClick={() => handleApproveOrder(order.id)}
                >
                  <BsCheck />
                  Approve
                </Button>
                <Button
                  variant="primary"
                  onClick={() => handleCompleteOrder(order.id)}
                >
                  <BsCheckCircleFill />
                  Complete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Delete Confirmation Modal */}
      <Modal show={deleteModalVisible} onHide={() => setDeleteModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setDeleteModalVisible(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteOrder}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Approve Confirmation Modal */}
      <Modal show={approveModalVisible} onHide={() => setApproveModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Approve</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to approve this order?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setApproveModalVisible(false)}>
            Cancel
          </Button>
          <Button variant="success" onClick={confirmApproveOrder}>
            Approve
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Complete Confirmation Modal */}
      <Modal show={completeModalVisible} onHide={() => setCompleteModalVisible(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Complete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to mark this order as completed?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setCompleteModalVisible(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={confirmCompleteOrder}>
            Complete
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default OrderTable;
