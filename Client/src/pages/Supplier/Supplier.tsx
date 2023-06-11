import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import SupplierTable from "../../components/Supplier/SupplierTable";
import AddSupplierModal from "../../components/Supplier/AddSupplierModal";
import SupplierModal from "../../components/Supplier/SupplierModal";
import "./../../css/Table.css";

import { Supplier } from "../../types";
import { fetchSuppliers, addSupplier, editSupplier, deleteSupplier } from "../../api/supplierApi";

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(null);

  useEffect(() => {
    fetchAllSuppliers();
  }, []);

  const fetchAllSuppliers = () => {
    fetchSuppliers()
      .then((suppliers) => setSuppliers(suppliers))
      .catch((error) => console.error(error));
  };

  const handleAddSupplier = (supplier: Supplier) => {
    addSupplier(supplier)
      .then(() => {
        fetchAllSuppliers();
        setShowAddModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEditSupplier = (supplier: Supplier) => {
    editSupplier(supplier)
      .then(() => {
        fetchAllSuppliers();
        setShowEditModal(false);
        setSelectedSupplier(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      deleteSupplier(supplier)
        .then(() => {
          fetchAllSuppliers();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-heading">SUPPLIERS</h2>
        </Col>
        <Col md={3}>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="btn-purple"
          >
            Add Supplier
          </Button>
          <AddSupplierModal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            onSubmit={handleAddSupplier}
          />
          {selectedSupplier && (
            <SupplierModal
              show={showEditModal}
              supplier={selectedSupplier}
              onHide={() => setShowEditModal(false)}
              onSubmit={handleEditSupplier}
            />
          )}
        </Col>
      </Row>
      <SupplierTable
        suppliers={suppliers}
        onEdit={(supplier) => {
          setSelectedSupplier(supplier);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteSupplier}
      />
    </Container>
  );
};

export default SupplierPage;
