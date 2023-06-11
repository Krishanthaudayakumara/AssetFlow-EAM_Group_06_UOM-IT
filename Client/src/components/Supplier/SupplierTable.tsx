import React from "react";
import { Table, Button } from "react-bootstrap";
import { Supplier } from "../../types";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import "./../../css/Table.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";

interface Props {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

const SupplierTable: React.FC<Props> = ({ suppliers, onEdit, onDelete }) => {
  return (
    <div className="table-box-shadow">
      <Table className="table">
        {" "}
        <thead>
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Address</th>
            <th>Contact Number</th>
            <th>Email</th>
            <th>Notes</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {suppliers.map((supplier, index) => (
            <tr key={supplier.id}>
              <td>{index + 1}</td>
              <td>{supplier.name}</td>
              <td>{supplier.address}</td>
              <td>{supplier.contactNumber}</td>
              <td>{supplier.email}</td>
              <td>{supplier.notes}</td>
              <td>
                <FontAwesomeIcon
                  icon={faPen}
                  style={{
                    color: "#482890",
                    cursor: "pointer",
                  }}
                  title="Edit Supplier"
                  onClick={() => onEdit(supplier)}
                />
                &nbsp; &nbsp; &nbsp;
                <FontAwesomeIcon
                  icon={faTrash}
                  style={{
                    color: "#FF615A",
                    cursor: "pointer",
                  }}
                  title="Delete Issue Type"
                  onClick={() => onDelete(supplier)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default SupplierTable;
