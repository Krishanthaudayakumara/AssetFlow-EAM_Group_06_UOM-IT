// ConfirmationModal.tsx
import React from 'react';
import { Modal, Button } from 'react-bootstrap';

type ConfirmationModalProps = {
  isOpen: boolean;
  onHide: () => void;
  onConfirm: () => Promise<void>;
  title: string;
  message: string;
};

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onHide,
  onConfirm,
  title,
  message,
}) => {
  return (
    <Modal show={isOpen} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{message}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="primary" onClick={onConfirm}>
          Confirm
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ConfirmationModal;
