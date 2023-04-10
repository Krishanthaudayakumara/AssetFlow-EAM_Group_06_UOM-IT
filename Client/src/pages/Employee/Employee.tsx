// Employee.tsx

import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Form, Modal } from "react-bootstrap";
import axios from "axios";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import AddEmployeeModal from "../../components/Employee/AddEmployeeModal";
import EmployeeModal from "../../components/Employee/EmployeeModal";

import { Employee } from "../../types";

const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showUploadModal, setShowUploadModal] = useState(false);

  const uploadFile = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "http://localhost:5087/api/Employee/upload",
        formData
      );
      console.log(response.data); // Employees uploaded successfully
      fetchEmployees();
      setShowUploadModal(false); // close the modal
    } catch (error) {
      console.error(error);
    }
  };

  const downloadSample = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5087/api/Employee/download/sample",
        {
          responseType: "blob",
        }
      );
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees_sample.xlsx");
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error(error);
    }
  };

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

  const downloadExcel = () => {
    axios({
      url: "http://localhost:5087/api/Employee/export",
      method: "GET",
      responseType: "blob",
    }).then((response) => {
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "employees.xlsx");
      document.body.appendChild(link);
      link.click();
    });
  };

  return (
    <Container>
      <Row>
        <Col>
          <Button variant="primary" onClick={() => setShowAddModal(true)} className="btn-l-purple">
            Add Employee
          </Button>

          <Button variant="primary" onClick={() => setShowUploadModal(true)} className="btn-l-purple">
            Upload Excel
          </Button>

          <Button variant="primary" onClick={() => downloadExcel()} className="btn-purple">
            Export to Excel
          </Button>

          <Button variant="primary" onClick={() => downloadSample()} className="btn-orange">
            Download Sample Excel
          </Button>

          

          <Modal
            show={showUploadModal}
            onHide={() => setShowUploadModal(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>Upload Excel</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="uploadExcel">
                  <Form.Label>Choose Excel file</Form.Label>
                  <Form.Control type="file" onChange={uploadFile} />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowUploadModal(false)}
              >
                Close
              </Button>
            </Modal.Footer>
          </Modal>

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
