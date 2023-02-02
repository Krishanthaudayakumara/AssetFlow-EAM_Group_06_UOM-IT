import { Fragment,useState } from "react";
import { Button, Modal,  Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Agents from "./Agents";
import AgentStatus from "./AgentStatus";

import SupportNav from "./SupportNav";

function AgentTable() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
         
       <SupportNav/>
      
      <p
        style={{
          margin: "0 0 30px 70px",
          color: "#482890",
          fontSize: "18px",
          fontWeight: "bold",
        }}
      >
        Avaliable Agents
      </p>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: "30px 0 0 65px" }}
      >
        <Fragment>
          <div>
            <Table
              className="table w-100 small table-borderless table-responsiv align-middle align-left"
              hover
              style={{ fontSize: "14px" }}
            >
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th></th>
                  <th>Agent Name</th>
                  <th>Position</th>
                  <th>Department</th>
                  <th>E mail</th>
                  <th>Pending</th>
                  <th>Completed</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Agents && Agents.length > 0
                  ? Agents.map((agent) => {
                      return (
                        <tr >
                          <td>
                            <img
                              src="/img/krish.png"
                              alt="User profile"
                              className="rounded-circle"
                              style={{ width: "45px", height: "45px" }}
                              onClick={handleShow}
                            />
                          </td>

                          <td>{agent.agent_name}</td>
                          <td className="text-secondary">
                            {agent.agent_position}
                          </td>
                          <td className="text-secondary">
                            {agent.agent_department}
                          </td>
                          <td className="text-secondary">
                            {agent.agent_email}
                          </td>
                          <td className="text-secondary">
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            {agent.agent_pending}
                          </td>
                          <td className="text-secondary">
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            {agent.agent_completed}
                          </td>
                          <td>
                            <AgentStatus></AgentStatus>
                          </td>
                          <td>
                            <FontAwesomeIcon
                              onClick={handleShow}
                              icon={faPen}
                              style={{ color: "#482890" }}
                            />
                            &nbsp; &nbsp; &nbsp;
                            <FontAwesomeIcon
                              icon={faTrash}
                              style={{ color: "#FF615A" }}
                            />
                          </td>
                        </tr>
                      );
                    })
                  : "No data available"}
              </tbody>
            </Table>

            <Modal show={show} onHide={handleClose}>
              <Modal.Header>
                <Modal.Title>Agent Details</Modal.Title>
              </Modal.Header>
              <Modal.Body></Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
              </Modal.Footer>
            </Modal>
          </div>
        </Fragment>
      </div>
    </div>
  );
}

export default AgentTable;
