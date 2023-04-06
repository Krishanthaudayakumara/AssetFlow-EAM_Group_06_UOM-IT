import { Fragment, useEffect, useState } from "react";
import { Table } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPen, faTrash } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import "../../../css/Support/Support.css";

interface ticketType {
  id: number;
  employeeId: number;
  email: string;
  issueTypeId: number;
  problem: string;
  submitDate: string;
  agentId: number;
  ticketStatus: number;
}
const TicketTable = () => {
  const [tickets, setTickets] = useState<ticketType[]>([]);
  useEffect(() => {
    axios
      .get("http://localhost:5224/Api/Ticket")
      .then((response) => {
        setTickets(response.data);
      })
      .catch((error) => {
        alert(error);
      });
  }, []);
  return (
    <div><p className="table-heading">Support Tickets</p>     
      <div className="box-shadow">
        <Fragment>
          <div>
            <Table className="support-table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th>Ticket ID</th>
                  <th>Employee ID</th>
                  <th>Issue Type</th>
                  <th>Problem</th>
                  <th>Submit Date</th>
                  <th>Assign Agent</th>
                  <th>Status</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td>{ticket.id}</td>
                    <td className="text-secondary"> {ticket.employeeId} </td>
                    <td> {ticket.issueTypeId} </td>
                    <td className="text-secondary"> {ticket.problem} </td>
                    <td> {ticket.submitDate} </td>
                    <td className="text-secondary"> {ticket.agentId} </td>
                    <td> {ticket.ticketStatus} </td>
                    <td>
                      {" "}
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{ color: "#482890" }}
                      />{" "}
                      &nbsp; &nbsp;
                      <FontAwesomeIcon
                        icon={faTrash}
                        style={{ color: "#FF615A" }}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Fragment>
      </div>
    </div>
  );
};

export default TicketTable;
