import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";

interface BuildingData {
  buildingName: string;
  floorNo: number;
}

function Forms() {
  const [formData, setFormData] = useState<BuildingData>({
    buildingName: "",
    floorNo: 0,
  });

  
  
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
   
    try {
      const response = await axios.post(
        "http://localhost:5087/api/Building",
        formData
      );
      console.log("form data" + formData);
      console.log(response.data);
      // Reset the form after successful submission
      setFormData({
        buildingName: "",
        floorNo: 0,
      });
      alert("Data saved successfully!");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Building name</Form.Label>
        <Form.Control
          type="text"
          id="name"
          name="buildingName"
          value={formData.buildingName}
          placeholder="Enter building name"
          required
          onChange={handleInputChange}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label htmlFor="name">Floor No</Form.Label>
        <Form.Control
          type="text"
          id="floorNo"
          name="floorNo"
          value={formData.floorNo}
          placeholder="Enter floor no"
          required
          onChange={handleInputChange}
        />
      </Form.Group>


      <Button variant="success" type="submit">
        Add a new building
      </Button>
    </Form>
  );
}

export default Forms;
