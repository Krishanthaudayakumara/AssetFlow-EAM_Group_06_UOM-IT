import React, { useState, useEffect, ChangeEvent } from "react";
import { Form, Button } from "react-bootstrap";
import axios from "axios";

interface BildingData {
  id: number;
  buildingName: string;
  floorNo: string;
  address: string;
}

function Workstationform() {
  const [selectedBuildingName, setSelectedBuildingName] = useState("");
  const [buildingName, setBuildingName] = useState<BildingData[]>([]);
  const [workStationName, setWorkStationName] = useState("");
  const [floor, setFloor] = useState<JSX.Element[]>([]);
  const [floornum, setFloorNum] = useState("");

  const [floorSelected, setFloorSelected] = useState("");
  useEffect(() => {
    const fetchBuildingNames = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/Building");
        const data = response.data;
        console.log(response.data);
        setBuildingName(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchBuildingNames();
  }, []);

  const handleBuildingChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBuildingName = event.target.value;
    console.log(event.target.value);
    setSelectedBuildingName(selectedBuildingName);
    const selectedBuildingData = buildingName.find(
      (building) => building.id === Number(selectedBuildingName)
    );

    console.log(selectedBuildingData);
    if (selectedBuildingData) {
      const floorSelected = selectedBuildingData.floorNo;
      console.log(floorSelected);

      let floorOptions: JSX.Element[] = [];

      for (let i = 1; i <= Number(floorSelected); i++) {
        floorOptions.push(
          <option key={i} value={i} selected={i.toString() === floorSelected}>
            {i}
          </option>
        );
      }
      setFloor(floorOptions);
    }
  };
  const handleFloorChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const floornum = event.target.value;
    console.log(floornum);
    setFloorNum(floornum);
  };

  return (
    <Form>
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

        <Form.Select value={floorSelected} onChange={handleFloorChange}>
          <option value="0">-- Please Select the floor of building --</option>
          {floor}
        </Form.Select>
      </Form.Group>

      <Form.Group className="mb-3" controlId="workstation_name">
        <Form.Label>Workstation name</Form.Label>
        <Form.Control type="text" placeholder="Enter workstation name" />
      </Form.Group>

      <Button variant="success" type="submit">
        Save the changes
      </Button>
    </Form>
  );
}

export default Workstationform;
