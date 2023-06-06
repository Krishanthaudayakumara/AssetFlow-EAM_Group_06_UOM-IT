import React, { useEffect, useState } from "react";
import { Container, Row, Col, Button, Table } from "react-bootstrap";
import axios from "axios";
import { Employee } from "../../types";
import { AxiosError } from "axios";

const DeletedEmployeePage: React.FC = () => {
  const [deletedEmployees, setDeletedEmployees] = useState<Employee[]>([]);

  useEffect(() => {
    fetchDeletedEmployees();
  }, []);

  const fetchDeletedEmployees = () => {
    axios
      .get("http://localhost:5087/api/Employee/deleted")
      .then((res) => {
        setDeletedEmployees(res.data);
      })
      .catch((error) => {
        console.error(error);
        // Handle error
      });
  };

  const restoreEmployee = (employee: Employee) => {
    axios
      .put(`http://localhost:5087/api/Employee/restore/${employee.id}`)
      .then(() => {
        fetchDeletedEmployees();
      })
      .catch((error: AxiosError<any>) => {
        console.error(error);
        // Handle error
      });
  };

  const permanentlyDeleteEmployee = (employee: Employee) => {
    if (window.confirm("Are you sure you want to permanently delete this employee?")) {
      axios
        .delete(`http://localhost:5087/api/Employee/${employee.id}/permanently`)
        .then(() => {
          fetchDeletedEmployees();
        })
        .catch((error: AxiosError<any>) => {
          console.error(error);
          // Handle error
        });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1>Deleted Employees</h1>
          <Table>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th>Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {deletedEmployees.map((employee) => (
                <tr key={employee.id}>
                  <td>{employee.firstName}</td>
                  <td>{employee.lastName}</td>
                  <td>{employee.email}</td>
                  <td>
                    <Button
                      variant="success"
                      onClick={() => restoreEmployee(employee)}
                    >
                      Restore
                    </Button>{" "}
                    <Button
                      variant="danger"
                      onClick={() => permanentlyDeleteEmployee(employee)}
                    >
                      Permanently Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  );
};

export default DeletedEmployeePage;
