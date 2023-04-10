import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import SupplierTable from "../../components/Supplier/SupplierTable";
import AddSupplierModal from "../../components/Supplier/AddSupplierModal";
import SupplierModal from "../../components/Supplier/SupplierModal";

import { Supplier } from "../../types";

const SupplierPage: React.FC = () => {
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState<Supplier | null>(
    null
  );

  useEffect(() => {
    fetchSuppliers();
  }, []);

  const fetchSuppliers = () => {
    axios
      .get("http://localhost:5087/api/Suppliers")
      .then((res) => {
        const data = res.data;
        const suppliers = data.map((supplier: any) => ({
          id: supplier.id,
          name: supplier.name,
          address: supplier.address,
          contactNumber: supplier.contactNumber,
          email: supplier.email,
          notes: supplier.notes,
        }));
        setSuppliers(suppliers);
      })
      .catch((error) => console.error(error));
  };

  const handleAddSupplier = (supplier: Supplier) => {
    axios
      .post("http://localhost:5087/api/Suppliers", supplier)
      .then(() => {
        fetchSuppliers();
        setShowAddModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEditSupplier = (supplier: Supplier) => {
    axios
      .put(`http://localhost:5087/api/Suppliers/${supplier.id}`, supplier)
      .then(() => {
        fetchSuppliers();
        setShowEditModal(false);
        setSelectedSupplier(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteSupplier = (supplier: Supplier) => {
    if (window.confirm("Are you sure you want to delete this supplier?")) {
      axios
        .delete(`http://localhost:5087/api/Suppliers/${supplier.id}`)
        .then(() => {
          fetchSuppliers();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
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
          <SupplierTable
            suppliers={suppliers}
            onEdit={(supplier) => {
              setSelectedSupplier(supplier);
              setShowEditModal(true);
            }}
            onDelete={handleDeleteSupplier}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default SupplierPage;
