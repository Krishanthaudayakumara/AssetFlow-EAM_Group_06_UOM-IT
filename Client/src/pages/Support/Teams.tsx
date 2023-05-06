import React, { useState } from 'react';
import { Container, Row, Button, Modal} from "react-bootstrap";
import TeamTable from '../../components/Support/Table/TeamTable';
import "./../../css/Support/Support.css";
import NewTeamForm from '../../components/Support/Forms/NewTeamForm';

const Teams: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
  return(
    <div className="container">
    <div className="row">
      <div className="col">
        <p className="page-heading">SUPPORT</p>
      </div>
      <div className="col-3" style={{ padding: "0 0 0 70px" }}>
        <button
          type="button"
          className="btn btn-outline-light"
          onClick={handleShow}
          style={{ backgroundColor: "#FF615A" }}
        >
          + Add New Team
        </button>
      </div>
    </div>
    <hr style={{ margin: "0 0 0 300px", color: "blue" }} />
    <div className="row">
      <div>
        <br />
        <TeamTable />
      </div>
    </div>
    <Modal show={showModal} onHide={handleClose}>
      <Modal.Header style={{ backgroundColor: "#482890" }}>
        <Modal.Title style={{ color: 'white' }}>New Issue Type</Modal.Title>
      </Modal.Header>
      <Modal.Body ><NewTeamForm /></Modal.Body>
      <Modal.Footer >
      <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>         
      </Modal.Footer>
    </Modal>
  </div>
  );
};
export default Teams;
