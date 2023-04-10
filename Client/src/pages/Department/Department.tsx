import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";

import DepartmentTable from "../../components/Department/DepartmentTable";
import AddDepartmentModal from "../../components/Department/AddDepartmentModal";
import DepartmentModal from "../../components/Department/DepartmentModal";

import { Department } from "../../types";

const DepartmentPage: React.FC = () => {
  const [departments, setDepartments] = useState<Department[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState<Department | null>(
    null
  );

  useEffect(() => {
    fetchDepartments();
  }, []);

  const fetchDepartments = () => {
    axios
      .get("http://localhost:5087/api/Departments")
      .then((res) => {
        const data = res.data;
        const departments = data.map((department: any) => ({
          id: department.id,
          name: department.name,
          description: department.description,
        }));
        setDepartments(departments);
      })
      .catch((error) => console.error(error));
  };

  const handleAddDepartment = (department: Department) => {
    axios
      .post("http://localhost:5087/api/Departments", department)
      .then(() => {
        fetchDepartments();
        setShowAddModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEditDepartment = (department: Department) => {
    axios
      .put(`http://localhost:5087/api/Departments/${department.id}`, department)
      .then(() => {
        fetchDepartments();
        setShowEditModal(false);
        setSelectedDepartment(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteDepartment = (department: Department) => {
    if (window.confirm("Are you sure you want to delete this department?")) {
      axios
        .delete(`http://localhost:5087/api/Departments/${department.id}`)
        .then(() => {
          fetchDepartments();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="btn-purple">
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
          <DepartmentTable
            departments={departments}
            onEdit={(department) => {
              setSelectedDepartment(department);
              setShowEditModal(true);
            }}
            onDelete={handleDeleteDepartment}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default DepartmentPage;
