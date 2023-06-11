// DepartmentTable.tsx

import React from "react";
import { Department } from "../../types";
import { Table, Button } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import "./../../css/Table.css";

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
    <div className="table-box-shadow">
      <Table className="table">
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
                <FontAwesomeIcon
                  icon={faPen}
                  style={{
                    color: "#482890",
                    cursor: "pointer",
                  }}
                  title="Edit Issue Type"
                  onClick={() => onEdit(department)}
                />
                &nbsp; &nbsp; &nbsp;
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    color: "#FF615A",
                    cursor: "pointer",
                  }}
                  title="Delete Issue Type"
                  onClick={() => onDelete(department)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default DepartmentTable;
