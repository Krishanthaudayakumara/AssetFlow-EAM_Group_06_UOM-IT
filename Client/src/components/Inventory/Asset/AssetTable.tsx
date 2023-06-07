import React from 'react';
import { Table, Button, Image } from 'react-bootstrap';
import {  BsPencilSquare,
    BsTrash } from 'react-icons/bs';

interface Asset {
  id: number;
  name: string;
  description: string;
  barcode: string;
  stockId: number;
  status: string;
  condition: string;
  warrantyExpiration: string;
  imageUrl: string;
  stock: {
    id: number;
    name: string;
    arrivalDate: string;
    supplierId: number;
    supplierName: string;
    imageUrl: string;
  };
}

interface AssetTableProps {
  assets: Asset[];
  onEdit: (asset: Asset) => void;
  onDelete: (asset: Asset) => void;
}

const AssetTable: React.FC<AssetTableProps> = ({ assets, onEdit, onDelete }) => {
  return (
    <Table striped bordered hover>
      <thead>
        <tr>
          <th>ID</th>
          <th>Image</th>
          <th>Name</th>
          <th>Description</th>
          <th>Barcode</th>
          <th>Stock Name</th>
          <th>Status</th>
          <th>Condition</th>
          <th>Warranty Expiration</th>
          <th>Arrival Date</th>
          <th>Supplier</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset) => (
          <tr key={asset.id}>
            <td>{asset.id}</td>
            <td>
              <Image src={asset.imageUrl} alt={asset.name} height={50} />
            </td>
            <td>{asset.name}</td>
            <td>{asset.description}</td>
            <td>{asset.barcode}</td>
            <td>{asset.stock.name}</td>
            <td>{asset.status}</td>
            <td>{asset.condition}</td>
            <td>{asset.warrantyExpiration}</td>
            <td>{asset.stock.arrivalDate}</td>
            <td>{asset.stock.supplierName}</td>
            <td>
              <Button variant="primary" onClick={() => onEdit(asset)}>
                <BsPencilSquare /> Edit
              </Button>{' '}
              <Button variant="danger" onClick={() => onDelete(asset)}>
                <BsTrash /> Delete
              </Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AssetTable;
