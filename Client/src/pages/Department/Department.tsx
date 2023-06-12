// DepartmentPage.tsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Spinner } from "react-bootstrap";

import DepartmentTable from "../../components/Department/DepartmentTable";
import AddDepartmentModal from "../../components/Department/AddDepartmentModal";
import DepartmentModal from "../../components/Department/DepartmentModal";
import "./../../css/Table.css";

import { Department } from "../../types";
import {
  fetchDepartments,
  addDepartment,
  editDepartment,
  deleteDepartment,
} from "../../api/departmentApi";

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(null);
  const [loading, setLoading] = useState(true); // New loading state

  useEffect(() => {
    fetchDepartments()
      .then((departments) => {
        setDepartments(departments);
        setLoading(false); // Set loading state to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching departments:", error);
        setLoading(false); // Set loading state to false in case of an error
      });
  }, []);

  const handleAddDepartment = (department: Department) => {
    addDepartment(department)
      .then(() => window.location.reload()) // Reload the page
      .catch((error) => console.error("Error adding department:", error));
    setShowAddModal(false);
  };

  const handleEditDepartment = (department: Department) => {
    editDepartment(department, fetchDepartments)
      .then(() => window.location.reload()) // Reload the page
      .catch((error) => console.error("Error editing department:", error));
    setShowEditModal(false);
    setSelectedDepartment(null);
  };

  const handleDeleteDepartment = (department: Department) => {
    deleteDepartment(department, fetchDepartments)
      .then(() => window.location.reload()) // Reload the page
      .catch((error) => console.error("Error deleting department:", error));
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-heading">DEPARTMENTS</h2>
        </Col>
        <Col md={3}>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="btn-purple"
          >
            Add Department
          </Button>
          <AddDepartmentModal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            onSubmit={handleAddDepartment}
          />
          {selectedDepartment && (
            <DepartmentModal
              show={showEditModal}
              department={selectedDepartment}
              onHide={() => setShowEditModal(false)}
              onSubmit={handleEditDepartment}
            />
          )}
        </Col>
      </Row>
      {loading ? ( // Conditional rendering of spinner while loading
        <Spinner animation="border" role="status">
        </Spinner>
      ) : (
        <DepartmentTable
          departments={departments}
          onEdit={(department) => {
            setSelectedDepartment(department);
            setShowEditModal(true);
          }}
          onDelete={handleDeleteDepartment}
        />
      )}
    </Container>
  );
};

export default DepartmentPage;
