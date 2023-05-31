import React from "react";
import { Modal } from "react-bootstrap";


interface ViewIssueTypeProps {
  show: boolean;
  onClose: () => void;
}

const ViewIssueType: React.FC<ViewIssueTypeProps> = ({ show, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} dialogClassName="view-issue-type-modal">
      <Modal.Header closeButton>
        <Modal.Title>View Issue Type</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {/* Add any content you want to display in the modal body */}
        <p>This is an empty modal. Add your content here.</p>
      </Modal.Body>
      <Modal.Footer>
        <button className="btn btn-secondary" onClick={onClose}>
          Close
        </button>
      </Modal.Footer>
    </Modal>
  );
};

export default ViewIssueType;
