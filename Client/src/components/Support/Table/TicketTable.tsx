import { Fragment, useState } from "react";
import { Button, Modal, Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen } from "@fortawesome/free-solid-svg-icons/faPen";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import Agents from "../Agents";
import AgentStatus from "../AgentStatus";

//import SupportNav from "./SupportNav";

function TicketTable() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div>
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
                  <th>Ticket ID</th>
                  <th>Employee ID</th>
                  <th>Issue Type</th>
                  <th>Problem</th>
                  <th>Submit Date</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {Agents && Agents.length > 0
                  ? Agents.map((agent) => {
                      return (
                        <tr>             
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
           </div>
        </Fragment>
      </div>
    </div>
  );
}

export default TicketTable;
