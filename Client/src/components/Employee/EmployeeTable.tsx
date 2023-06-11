// EmployeeTable.tsx

import React from "react";
import { Table, Button } from "react-bootstrap";
import { Employee } from "../../types";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./../../css/Table.css";

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (employee: Employee) => void;
}

const EmployeeTable: React.FC<Props> = ({ employees, onEdit, onDelete }) => {
  return (
    <div className="table-container shadow p-3 bg-white rounded">
      <Table className="table">
        {" "}
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Middle Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Job Title</th>
            <th>Department</th>
            <th>User</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.middleName}</td>
              <td>{employee.email}</td>
              <td>{employee.phoneNumber}</td>
              <td>{employee.jobTitle}</td>
              <td>{employee.department}</td>
              <td>{employee.user}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPen}
                  style={{
                    color: "#482890",
                    cursor: "pointer",
                  }}
                  title="Edit Emploee"
                  onClick={() => onEdit(employee)}
                />
                &nbsp; &nbsp; &nbsp;
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    color: "#FF615A",
                    cursor: "pointer",
                  }}
                  title="Delete Employee"
                  onClick={() => onDelete(employee)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default EmployeeTable;
