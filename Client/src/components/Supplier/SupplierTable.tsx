import React from "react";
import { Table, Button } from "react-bootstrap";
import { Supplier } from "../../types";
import { BsPencilSquare, BsTrash } from "react-icons/bs";

interface Props {
  suppliers: Supplier[];
  onEdit: (supplier: Supplier) => void;
  onDelete: (supplier: Supplier) => void;
}

const SupplierTable: React.FC<Props> = ({ suppliers, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Address</th>
          <th>Contact Number</th>
          <th>Email</th>
          <th>Notes</th>
          <th>Edit</th>
          <th>Delete</th>

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
              <Button
                variant="outline-primary"
                onClick={() => onEdit(supplier)}
              >
                <BsPencilSquare />
              </Button>{" "}
            </td>
            <td>
              <Button
                variant="outline-danger"
                onClick={() => onDelete(supplier)}
              >
                <BsTrash />
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default SupplierTable;
