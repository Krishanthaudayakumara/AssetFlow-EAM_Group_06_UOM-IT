import React from "react";
import { Table } from "react-bootstrap";

interface Employee {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string | null;
  email: string;
  phoneNumber: string;
  jobTitle: string | null;
  departmentId: number;
  department: string | null;
  userId: string;
  user: string | null;
}

interface Props {
  employees: Employee[];
}

const EmployeeTable: React.FC<Props> = ({ employees }) => {
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
            </tr>
        ))}
        </tbody>
    </Table>
    );
};

export default EmployeeTable;
