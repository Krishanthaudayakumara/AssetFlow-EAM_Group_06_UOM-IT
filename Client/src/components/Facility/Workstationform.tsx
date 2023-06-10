import React, { useState, useEffect, ChangeEvent } from "react";
import { Form, Button, Alert, Modal } from "react-bootstrap";
import axios from "axios";

interface BuildingData {
  id: number;
  buildingName: string;
  floorNo: string;
  address: string;
  workstationNames?: string[];
}

function WorkstationForm() {
  const [selectedBuildingName, setSelectedBuildingName] = useState("");
  const [buildingName, setBuildingName] = useState<BuildingData[]>([]);
  const [workstationName, setWorkstationName] = useState("");
  const [floor, setFloor] = useState<JSX.Element[]>([]);
  const [floornum, setFloorNum] = useState<string>("");
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const fetchBuildingNames = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/Building");
        const data = response.data;
        setBuildingName(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchBuildingNames();
  }, []);

  const handleBuildingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBuildingName = event.target.value;
    setSelectedBuildingName(selectedBuildingName);
    const selectedBuildingData = buildingName.find(
      (building) => building.id === Number(selectedBuildingName)
    );

    if (selectedBuildingData) {
      const floorSelected = selectedBuildingData.floorNo;

      let floorOptions: JSX.Element[] = [];

      for (let i = 1; i <= Number(floorSelected); i++) {
        floorOptions.push(
          <option
            key={i}
            value={i}
            selected={i.toString() === floorSelected}
          >
            {i}
          </option>
        );
      }
      setFloor(floorOptions);
    }
  };

  const handleFloorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const floornum = event.target.value;
    setFloorNum(floornum);
  };

  const handleWorkstationNameChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const workstationName = event.target.value;
    setWorkstationName(workstationName);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (selectedBuildingName === "" || floornum === "" || workstationName === "") {
      alert("Please fill out all the fields.");
      return;
    }

    // Check if the workstation name already exists
    const existingBuilding = buildingName.find(
      (building) => building.id === Number(selectedBuildingName)
    );

    if (existingBuilding && existingBuilding.workstationNames) {
      const isExistingWorkstationName = existingBuilding.workstationNames.includes(workstationName);
      if (isExistingWorkstationName) {
        setAlertMessage("Workstation name already exists. Please enter a different name.");
        setShowAlert(true);
        return;
      }
    }

    try {
      // Check if the workstation name already exists on the server
      const response = await axios.get("http://localhost:5087/api/Workstation", {
        params: {
          buildingId: selectedBuildingName,
          floor: floornum,
          workstationName: workstationName,
        },
      });

      if (response.data === true) {
        setAlertMessage("Workstation name already exists. Please enter a different name.");
        setShowAlert(true);
        return;
      }

      // If workstation name doesn't exist, add it to the server
      const addWorkstationResponse = await axios.post(
        "http://localhost:5087/api/Workstation",
        {
          workstationName: workstationName,
          floor: parseInt(floornum),
          buildingId: parseInt(selectedBuildingName),
        }
      );

      if (addWorkstationResponse.status === 200) {
        setModalMessage("Workstation added successfully.");
        setShowModal(true);
        // Clear the form fields after successful submission
        setWorkstationName("");
        setFloorNum("");
        setSelectedBuildingName("");
      }
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setAlertMessage("Workstation name already exists. Please enter a different name.");
        setShowAlert(true);
      } else {
        setAlertMessage("An error occurred while adding the workstation.");
        setShowAlert(true);
        console.error(error);
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <Form onSubmit={handleSubmit}>
      {showAlert && (
        <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
          {alertMessage}
        </Alert>
      )}
      <Form.Group className="mb-3" controlId="buildingName">
        <Form.Label>Building Name</Form.Label>
        <Form.Select onChange={(e) => handleBuildingChange(e)}>
          <option value="0">-- Please Select Building Name --</option>
          {buildingName.map((building) => (
            <option key={building.id} value={building.id}>
              {building.buildingName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="floor">
        <Form.Label>Floor</Form.Label>

        <Form.Select onChange={handleFloorChange}>
          <option value="0">-- Please Select the floor of building --</option>
          {floor}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="workstation_name">
        <Form.Label>Workstation name</Form.Label>
        <Form.Control
          type="text"
          placeholder="Enter workstation name"
          value={workstationName}
          onChange={handleWorkstationNameChange}
        />
      </Form.Group>

      <Button variant="success" type="submit">
        Save the changes
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalMessage}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Form>
  );
}

export default WorkstationForm;
