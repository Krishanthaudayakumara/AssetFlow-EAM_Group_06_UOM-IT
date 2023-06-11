import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { Button, Modal, Form, Badge } from "react-bootstrap";
import axios from "axios";
import "./../../css/Table.css";

interface FacilityAssetData {
  id: number;
  assetId: number;
  assetConditionStatus: string;
  assignedDate: string;
  receivedDate: string;
  assignStatus: string;
  workstationId: number;
}

function FacilityAssetTable() {
  const [facilityData, setFacilityData] = useState<FacilityAssetData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);

  useEffect(() => {
    const fetchFacilityAssetData = async () => {
      try {
        const response = await axios.get<FacilityAssetData[]>(
          "http://localhost:5087/api/FacilityAsset/GetAllFacilityAssets"
        );
        console.log(response);
        setFacilityData(response.data);
      } catch (error) {
        setError("Error fetching facility asset data");
        console.log(error);
      }
    };

    fetchFacilityAssetData();
  }, []);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleStatusChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStatus(event.target.value);
  };

  const handleFormSubmit = async () => {
    if (selectedAssetId && selectedStatus) {
      try {
        await axios.put(
          `http://localhost:5087/api/FacilityAsset/update/${selectedAssetId}`,
          { assetConditionStatus: selectedStatus }
        );
        setSuccess(true);
        setShowModal(false);
      } catch (error) {
        setError("Error updating asset condition status");
        console.log(error);
      }
    }
  };

  const handleEditAssetCondition = (assetId: number) => {
    setSelectedAssetId(assetId);
    setShowModal(true);
  };

  return (
    <div style={{ margin: "4rem" }}>
      <div
        className="shadow p-2 mb- bg-white rounded"
        style={{ width: "850px" }}
      >
        <Table className="table">
          <thead>
            <tr style={{ color: "#482890" }}>
              <th>FacilityAsset id</th>
              <th>Asset id</th>
              <th colSpan={1}>Assetcondition status</th>
              <th>Received date</th>
              <th>Assign Status</th>
              <th>Assigned date</th>
              <th>workstationId</th>

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {facilityData && facilityData.length > 0 ? (
              facilityData.map((item) => {
                return (
                  <tr key={item.id} style={{ textAlign: "center" }}>
                    <td>{item.id}</td>
                    <td>{item.assetId}</td>
                    <td>{item.assetConditionStatus}</td>
                    <td>{item.receivedDate}</td>
                    <td>
                      {item.assignStatus === "Assign" ? (
                        <Badge bg="success">Assign</Badge>
                      ) : (
                        <Badge bg="danger">Not Assigned</Badge>
                      )}
                    </td>
                    <td>{item.assignedDate}</td>
                    <td>{item.workstationId}</td>

                    <td>
                      <FaPen
                        style={{
                          color: " #482890",
                          marginLeft: "10px",
                          cursor: "pointer",
                        }}
                        onClick={() => handleEditAssetCondition(item.id)}
                      />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Update Asset Condition Status</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="workstation_name">
              <Form.Label>Condition Status</Form.Label>
              <Form.Select onChange={handleStatusChange}>
                <option value="0">--Select status--</option>
                <option value="Use">Use</option>
                <option value="Damage">Damage</option>
              </Form.Select>
            </Form.Group>
          </Form>
          <Button variant="secondary" onClick={handleFormSubmit}>
            Submit
          </Button>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Success Modal */}
      <Modal show={success} onHide={() => setSuccess(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Asset condition status updated successfully!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setSuccess(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Error Modal */}
      <Modal show={!!error} onHide={() => setError(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{error}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setError(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FacilityAssetTable;
