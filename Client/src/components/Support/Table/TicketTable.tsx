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
      .get("http://localhost:5087/Api/Ticket")
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
                    <td> {ticket.problem} </td>
                    <td> {ticket.submitDate} </td>
                    <td> {ticket.agentId} </td>
                    <td> {ticket.ticketStatus} </td>
                    <td> <FontAwesomeIcon icon={faPen} style={{ color: "#482890" }}/>
                      &nbsp; &nbsp;
                      <FontAwesomeIcon icon={faTrash} style={{ color: "#FF615A" }}/>
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
