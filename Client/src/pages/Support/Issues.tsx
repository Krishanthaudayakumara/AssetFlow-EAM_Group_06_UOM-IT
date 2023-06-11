import React, { useState } from "react";
import { Modal, Button } from "react-bootstrap";
import IssueTypeTable from "../../components/Support/Table/IssueTypeTable";
import "./../../css/Support/Support.css";
import NewIssurTypeForm from "../../components/Support/Forms/IssueType/NewIssueTypeForm";

const Issues: React.FC = () => {
  const [showModal, setShowModal] = useState(false);

  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <h2 className="page-heading">SUPPORT ISSUES</h2>
        </div>
        <div className="col-3" style={{ padding: "0 0 0 70px" }}>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleShow}
            style={{ backgroundColor: "#FF615A" }}
          >
            + Add Issue Type
          </button>
        </div>
      </div>
      <hr style={{ margin: "0 0 0 300px", color: "blue" }} />
      <div className="row">
        <div>
          <br />
          <IssueTypeTable />
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>New Issue Type</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewIssurTypeForm handleClose={handleClose} />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Issues;
