// DepartmentTable.tsx

import React from "react";
import { Department } from "../../types";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

interface Props {
  departments: Department[];
  onEdit: (department: Department) => void;
  onDelete: (department: Department) => void;
}

const DepartmentTable: React.FC<Props> = ({
  departments,
  onEdit,
  onDelete,
}) => {
  return (
    <div
        className="table-container shadow p-3 bg-white rounded"
      >
    <Table
      striped
      className="table w-100 small table-borderless table-responsiv align-middle align-left"
      hover
    >
      
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department) => (
            <tr key={department.id}>
              <td>{department.id}</td>
              <td>{department.name}</td>
              <td>{department.description}</td>
              <td>
                <Button
                  variant="outline-primary"
                  onClick={() => onEdit(department)}
                  className="btn-l-purple"
                >
                  <BsPencilSquare />
                </Button>{" "}
                <Button
                  variant="outline-danger"
                  onClick={() => onDelete(department)}
                  className="btn-orange"
                >
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
    </Table>
    </div>

  );
};

export default DepartmentTable;
