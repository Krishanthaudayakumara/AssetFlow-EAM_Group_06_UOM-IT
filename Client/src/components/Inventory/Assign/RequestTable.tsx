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

interface Employee {
  id: number;
  firstName: string;
  // Add other employee properties if necessary
}

interface Asset {
  id: number;
  name: string;
  // Add other asset properties if necessary
}

const EmployeeRequestTable: React.FC = () => {
  const [employeeRequests, setEmployeeRequests] = useState<EmployeeRequest[]>(
    []
  );
  const [acceptedRequests, setAcceptedRequests] = useState<EmployeeRequest[]>(
    []
  );
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [assets, setAssets] = useState<Asset[]>([]);

  useEffect(() => {
    fetchEmployeeRequests();
  }, []);

  useEffect(() => {
    fetchAssets();
  }, []);

  const fetchEmployeeRequests = async () => {
    try {
      const [requestsResponse, employeesResponse] = await Promise.all([
        axios.get<EmployeeRequest[]>("http://localhost:5087/api/EmployeeRequest"),
        axios.get<Employee[]>("http://localhost:5087/api/Employee"),
      ]);

      setEmployeeRequests(requestsResponse.data);
      setAcceptedRequests(
        requestsResponse.data.filter((request) => request.isAccepted)
      );
      setEmployees(employeesResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchAssets = async () => {
    try {
      const response = await axios.get<Asset[]>("http://localhost:5087/api/Asset");
      setAssets(response.data);
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

  const getAssetName = (assetId: number) => {
    const asset = assets.find((a) => a.id === assetId);
    return asset ? asset.name : "";
  };

  return (
    <div>
      <h2 className="table-page-heading">EMPLOYEE REQUESTS</h2>
      <div className="table-box-shadow">
        <Table className="table">
          <thead>
            <tr>
              
              <th>Employee First Name</th>
              <th>Asset Name</th>
              <th>Is Accepted</th>
            </tr>
          </thead>
          <tbody>
            {employeeRequests.map((request) => {
              const employee = employees.find((e) => e.id === request.employeeId);
              const firstName = employee ? employee.firstName : "";
              const assetName = getAssetName(request.assetId);
              return (
                <tr key={request.id}>
                 
                  <td>{firstName}</td>
                  <td>{assetName}</td>
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
              );
            })}
          </tbody>
        </Table>
      </div>

      <h2 className="table-page-heading">ACCEPTED REQUESTS</h2>
      <div className="table-box-shadow">
        <Table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Employee First Name</th>
              <th>Asset Name</th>
              <th>Accepted Date and Time</th>
            </tr>
          </thead>
          <tbody>
            {acceptedRequests.map((request) => {
              const employee = employees.find((e) => e.id === request.employeeId);
              const firstName = employee ? employee.firstName : "";
              const assetName = getAssetName(request.assetId);
              return (
                <tr key={request.id}>
                  <td>{request.id}</td>
                  <td>{firstName}</td>
                  <td>{assetName}</td>
                  <td>{formatLocalDateTime(request.acceptedDateTime)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default EmployeeRequestTable;
