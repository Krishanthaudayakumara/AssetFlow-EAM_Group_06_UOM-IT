// Employee.tsx

import React, { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import EmployeeTable from "../../components/Employee/EmployeeTable";
import AddEmployeeModal from "../../components/Employee/AddEmployeeModal";
import EmployeeModal from "../../components/Employee/EmployeeModal";

import { Employee } from "../../types";
import { AxiosError } from "axios";
import DeleteConfirmationModal from "../../components/Employee/DeleteConfirmationModal";
import { BsTrash } from "react-icons/bs";

const EmployeePage: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(
    null
  );
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state
  const [showDeleteConfirmation, setShowDeleteConfirmation] = useState(false); // Delete confirmation state
  const [employeeToDelete, setEmployeeToDelete] = useState<Employee | null>(
    null
  ); // Employee to delete state

  const timeout = 4000; // Timeout for error alert

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
      setError("An error occurred while uploading the file."); // Set error message
      setTimeout(() => {
        setError(null); // Clear error message after 5 seconds
      }, timeout);
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
      setError("An error occurred while downloading the sample file."); // Set error message
      setTimeout(() => {
        setError(null); // Clear error message after 5 seconds
      }, timeout);
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
      .catch((error) => {
        console.error(error);
        setError("An error occurred while fetching employees."); // Set error message
        setTimeout(() => {
          setError(null); // Clear error message after 5 seconds
        }, timeout);
      });
  };

  const handleAddEmployee = (employee: Employee) => {
    axios
      .post("http://localhost:5087/api/Employee", employee)
      .then(() => {
        fetchEmployees();
        setShowAddModal(false);
      })
      .catch((error: AxiosError<any>) => {
        console.error(error);
        const errorResponse = error.response?.data;

        if (errorResponse && typeof errorResponse === "object") {
          const errorMessages = Object.values(errorResponse.errors || {}).join(
            ", "
          );
          setError(
            errorMessages || "An error occurred while adding the employee."
          );
        } else {
          setError("An error occurred while adding the employee.");
        }

        setTimeout(() => {
          setError(null);
        }, timeout);
      });
  };

  const handleEditEmployee = (employee: Employee) => {
    axios
      .put(`http://localhost:5087/api/Employee/${employee.id}`, employee)
      .then(() => {
        fetchEmployees();
        setShowEditModal(false);
        setSelectedEmployee(null);
      })
      .catch((error: AxiosError<any>) => {
        console.error(error);
        const errorMessage =
          error.response?.data && typeof error.response.data === "object"
            ? JSON.stringify(error.response.data)
            : "An error occurred while updating the employee.";

        setError(errorMessage); // Set error message
        setTimeout(() => {
          setError(null); // Clear error message after 5 seconds
        }, timeout);
      });
  };

  const handleDeleteEmployee = (employee: Employee) => {
    setEmployeeToDelete(employee);
    setShowDeleteConfirmation(true);
  };

  const confirmDeleteEmployee = () => {
    if (employeeToDelete) {
      axios
        .delete(`http://localhost:5087/api/Employee/${employeeToDelete.id}`)
        .then(() => {
          fetchEmployees();
          setShowDeleteConfirmation(false);
        })
        .catch((error: AxiosError<any>) => {
          console.error(error);
          const errorMessage =
            error.response?.data && typeof error.response.data === "object"
              ? JSON.stringify(error.response.data)
              : "An error occurred while deleting the employee.";

          setError(errorMessage); // Set error message
          setTimeout(() => {
            setError(null); // Clear error message after 5 seconds
          }, timeout);
        });
    }
  };

  const downloadExcel = () => {
    axios({
      url: "http://localhost:5087/api/Employee/export",
      method: "GET",
      responseType: "blob",
    })
      .then((response) => {
        const url = window.URL.createObjectURL(new Blob([response.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "employees.xlsx");
        document.body.appendChild(link);
        link.click();
      })
      .catch((error) => {
        console.error(error);
        setError("An error occurred while exporting to Excel."); // Set error message
        setTimeout(() => {
          setError(null); // Clear error message after 5 seconds
        }, timeout);
      });
  };

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="page-heading">EMPLOYEES</h2>
        </Col>
        <Col md={3}>
          <Button
            variant="primary"
            onClick={() => setShowAddModal(true)}
            className="btn-l-purple"
          >
            Add Employee
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          {error && ( // Display error alert if error message exists
            <Alert variant="danger" onClose={() => setError(null)} dismissible>
              {error}
            </Alert>
          )}

          <Button
            variant="primary"
            onClick={() => setShowUploadModal(true)}
            className="btn-l-purple"
          >
            Upload Excel
          </Button>

          <Button
            variant="primary"
            onClick={() => downloadExcel()}
            className="btn-purple"
          >
            Export to Excel
          </Button>

          <Button
            variant="primary"
            onClick={() => downloadSample()}
            className="btn-orange"
          >
            Download Sample Excel
          </Button>

          <a
            href="/deleted-employee"
            className="btn-purple"
            style={{ textDecoration: "none" }}
          >
            {" "}
            <BsTrash /> Trash
          </a>

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
      <DeleteConfirmationModal
        show={showDeleteConfirmation}
        employee={employeeToDelete}
        onClose={() => setShowDeleteConfirmation(false)}
        onDelete={confirmDeleteEmployee}
      />
    </Container>
  );
};

export default EmployeePage;
