import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Fragment } from "react";
import { Table } from "react-bootstrap";
import axios from "axios";

interface Ticket {
  id: number;
  problem: string;
  // Add other properties of the ticket object as needed
}

interface Props {
  teamId: number;
}

const TeamToTicket: React.FC<Props> = ({ teamId }) => {
  const [tickets, setTickets] = useState<Ticket[]>([]);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axios.get(`http://localhost:5087/Api/Ticket/team/${teamId}`);
        setTickets(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (teamId) {
      fetchTickets();
    }
  }, [teamId]);

  return (
    <div>
      <div className="row">
        <div className="col-8">
          <p className="table-heading">Team Name</p>
        </div>
        <div className="col-1"></div>
      </div>

      <div className="box-shadow">
        <Fragment>
          <div>
            <Table className="support-table">
              <thead>
                <tr style={{ color: "#482890" }}>
                  <th style={{ width: "60px" }}></th>
                  <th>Ticket ID</th>
                  <th>Problem</th>
                </tr>
              </thead>
              <tbody>
                {tickets.map((ticket) => (
                  <tr key={ticket.id}>
                    <td></td>
                    <td>{ticket.id}</td>
                    <td>{ticket.problem}</td>
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

export default TeamToTicket;
