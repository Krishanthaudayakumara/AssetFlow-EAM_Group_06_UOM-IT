// EmployeeTable.tsx

import React from "react";
import { Table, Button } from "react-bootstrap";
import { Employee } from "../../types";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable: React.FC<Props> = ({ employees, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Middle Name</th>
          <th>Email</th>
          <th>Phone Number</th>
          <th>Job Title</th>
          <th>Department</th>
          <th>User</th>
          <th>Edit</th>
          <th>Delete</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((employee) => (
          <tr key={employee.id}>
            <td>{employee.id}</td>
            <td>{employee.firstName}</td>
            <td>{employee.lastName}</td>
            <td>{employee.middleName}</td>
            <td>{employee.email}</td>
            <td>{employee.phoneNumber}</td>
            <td>{employee.jobTitle}</td>
            <td>{employee.department}</td>
            <td>{employee.user}</td>
            <td>
              <Button variant="light" onClick={() => onEdit(employee)}>
                <BsPencilSquare />
              </Button>{" "}
            </td>
            <td>
              <Button variant="danger" onClick={() => onDelete(employee)}>
                <BsTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default EmployeeTable;
