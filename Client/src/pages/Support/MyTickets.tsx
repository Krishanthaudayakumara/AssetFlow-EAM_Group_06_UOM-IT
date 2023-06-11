import React, { useState } from 'react';
import { Button, Modal} from "react-bootstrap";

import NewTicketForm from '../../components/Support/Forms/Ticket/NewTicketForm';
import MyTicketTable from '../../components/Support/Table/MyTicketTable';

const MyTickets: React.FC = () => {
  const [showModal, setShowModal] = useState(false);
  const handleClose = () => setShowModal(false);
  const handleShow = () => setShowModal(true);
    return(
      <div className="container">
      <div className="row">
        <div className="col">
          <p className="page-heading">MY TICKETS</p>
        </div>
        <div className="col-3" style={{ padding: "0 0 0 70px" }}>
          <button
            type="button"
            className="btn btn-outline-light"
            onClick={handleShow}
            style={{ backgroundColor: "#FF615A" }}
          >
            + Add New Ticket
          </button>
        </div>
      </div>
      <hr style={{ margin: "0 0 0 300px", color: "blue" }} />
      <div className="row">
        <div>
          <br />
         <MyTicketTable/>
        </div>
      </div>
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header style={{ backgroundColor: "#482890" }}>
          <Modal.Title style={{ color: "white" }}>New Ticket</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <NewTicketForm  setShowModal={setShowModal}/>
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
export default MyTickets;