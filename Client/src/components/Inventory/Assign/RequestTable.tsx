import React, { useEffect, useState } from "react";
import axios from "axios";
import "../../../css/Table.css";
import { Table } from "react-bootstrap";

interface EmployeeRequest {
  id: number;
  employeeId: number;
  assetId: number;
  isAccepted: boolean;
  acceptedDateTime: string;
}

const EmployeeRequestTable: React.FC = () => {
  const [employeeRequests, setEmployeeRequests] = useState<EmployeeRequest[]>(
    []
  );
  const [acceptedRequests, setAcceptedRequests] = useState<EmployeeRequest[]>(
    []
  );

  useEffect(() => {
    fetchEmployeeRequests();
  }, []);

  const fetchEmployeeRequests = async () => {
    try {
      const response = await axios.get<EmployeeRequest[]>(
        "http://localhost:5087/api/EmployeeRequest"
      );
      setEmployeeRequests(response.data);
      setAcceptedRequests(
        response.data.filter((request) => request.isAccepted)
      );
    } catch (error) {
      console.log(error);
    }
  };

  const handleToggleAcceptance = async (id: number) => {
    try {
      const updatedRequests = employeeRequests.map((request) => {
        if (request.id === id) {
          const updatedRequest = {
            ...request,
            isAccepted: !request.isAccepted,
            acceptedDateTime: request.isAccepted
              ? ""
              : new Date().toISOString(),
          };
          if (updatedRequest.isAccepted) {
            setAcceptedRequests([...acceptedRequests, updatedRequest]);
          } else {
            setAcceptedRequests(acceptedRequests.filter((r) => r.id !== id));
          }
          return updatedRequest;
        }
        return request;
      });
      setEmployeeRequests(updatedRequests);
      await axios.put(`http://localhost:5087/api/EmployeeRequest/${id}`, {
        isAccepted: updatedRequests.find((r) => r.id === id)?.isAccepted,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const formatLocalDateTime = (dateTime: string) => {
    return new Date(dateTime).toLocaleString();
  };

  return (
    <div>
      <h2 className="table-page-heading">EMPLOYEE REQUESTS</h2>
      <div className="table-box-shadow">
      <Table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Asset ID</th>
            <th>Is Accepted</th>
          </tr>
        </thead>
        <tbody>
          {employeeRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.employeeId}</td>
              <td>{request.assetId}</td>
              <td>
                <button
                  className={`btn ${
                    request.isAccepted ? "btn-success" : "btn-danger"
                  }`}
                  onClick={() => handleToggleAcceptance(request.id)}
                >
                  {request.isAccepted ? "Accepted" : "Not Accepted"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>

      <h2 className="table-page-heading">ACCEPTED REQUESTS</h2>
      <div className="table-box-shadow">
      <Table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Employee ID</th>
            <th>Asset ID</th>
            <th>Accepted Date and Time</th>
          </tr>
        </thead>
        <tbody>
          {acceptedRequests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td>
              <td>{request.employeeId}</td>
              <td>{request.assetId}</td>
              <td>{formatLocalDateTime(request.acceptedDateTime)}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      </div>
    </div>
  );
};

export default EmployeeRequestTable;
