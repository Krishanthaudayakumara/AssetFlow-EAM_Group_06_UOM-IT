import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";

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
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department | null>(null);

  useEffect(() => {
    fetchDepartments().then((departments) => {
      setDepartments(departments);
    });
  }, []);
  

  const handleAddDepartment = (department: Department) => {
    addDepartment(department, fetchDepartments);
    setShowAddModal(false);
  };

  const handleEditDepartment = (department: Department) => {
    editDepartment(department, fetchDepartments);
    setShowEditModal(false);
    setSelectedDepartment(null);
  };

  const handleDeleteDepartment = (department: Department) => {
    deleteDepartment(department, fetchDepartments);
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
      <DepartmentTable
        departments={departments}
        onEdit={(department) => {
          setSelectedDepartment(department);
          setShowEditModal(true);
        }}
        onDelete={handleDeleteDepartment}
      />
    </Container>
  );
};

export default DepartmentPage;
