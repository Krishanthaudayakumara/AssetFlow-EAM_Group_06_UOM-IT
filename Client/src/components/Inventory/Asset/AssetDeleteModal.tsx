import React from 'react';
import { Modal, Button } from 'react-bootstrap';

interface Asset {
  id: number;
  name: string;
}

interface AssetDeleteModalProps {
  show: boolean;
  asset: Asset | null;
  onDelete: (asset: Asset) => void;
  onClose: () => void;
}

const AssetDeleteModal: React.FC<AssetDeleteModalProps> = ({ show, asset, onDelete, onClose }) => {
  const handleDelete = () => {
    onDelete(asset!);
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Asset</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete the asset: {asset?.name}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default AssetDeleteModal;
