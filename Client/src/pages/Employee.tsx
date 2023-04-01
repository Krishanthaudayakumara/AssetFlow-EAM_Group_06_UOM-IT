// Employee.tsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import axios from "axios";
import EmployeeTable from "../components/Employee/EmployeeTable";
import AddEmployeeModal from "../components/Employee/AddEmployeeModal";
import EmployeeModal from "../components/Employee/EmployeeModal";

import { Employee } from "../types"; 


const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );

  useEffect(() => {
    fetchEmployees();
  }, []);

  const fetchEmployees = () => {
    axios
      .get("http://localhost:5087/api/Employee")
      .then((res) => {
        const data = res.data;
        const employees = data.map((employee: any) => ({
          id: employee.id,
          firstName: employee.firstName,
          lastName: employee.lastName,
          middleName: employee.middleName,
          email: employee.email,
          phoneNumber: employee.phoneNumber,
          dateOfBirth: employee.dateOfBirth,
          hireDate: employee.hireDate,
          jobTitle: employee.jobTitle,
          departmentId: employee.departmentId,
          department: employee.department ? employee.department.name : null,
          userId: employee.userId,
          user: employee.user ? employee.user.userName : null,
        }));
        setEmployees(employees);
      })
      .catch((error) => console.error(error));
  };

  const handleAddEmployee = (employee: Employee) => {
    axios
      .post("http://localhost:5087/api/Employee", employee)
      .then(() => {
        fetchEmployees();
        setShowAddModal(false);
      })
      .catch((error) => console.error(error));
  };

  const handleEditEmployee = (employee: Employee) => {
    axios
      .put(`http://localhost:5087/api/Employee/${employee.id}`, employee)
      .then(() => {
        fetchEmployees();
        setShowEditModal(false);
        setSelectedEmployee(null);
      })
      .catch((error) => console.error(error));
  };

  const handleDeleteEmployee = (employee: Employee) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      axios
        .delete(`http://localhost:5087/api/Employee/${employee.id}`)
        .then(() => {
          fetchEmployees();
        })
        .catch((error) => console.error(error));
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setShowAddModal(true)}>
            Add Employee
          </Button>
          <AddEmployeeModal
            show={showAddModal}
            onHide={() => setShowAddModal(false)}
            onSubmit={handleAddEmployee}
          />
          {selectedEmployee && (
            <EmployeeModal
              show={showEditModal}
              employee={selectedEmployee}
              onHide={() => setShowEditModal(false)}
              onSubmit={handleEditEmployee}
            />
          )}
          <EmployeeTable
            employees={employees}
            onEdit={(employee) => {
              setSelectedEmployee(employee);
              setShowEditModal(true);
            }}
            onDelete={handleDeleteEmployee}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default EmployeePage;
