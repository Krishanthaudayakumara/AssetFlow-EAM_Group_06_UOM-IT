import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

function FacilityAssetForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectAssignOption, setSelectAssignOption] = useState("");

  // model to create the object related to facility asset data
  interface FacilityAssetData {
    assetConditionStatus: string;
    receivedDate: string;
    assetId: number;
    assignStatus: string;
  }

  const [formData, setFormData] = useState<FacilityAssetData>({
    assetConditionStatus: "New",
    assignStatus: "Not Assign",
    receivedDate: "",
    assetId: 0,
  });

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement & HTMLInputElement>): void => {
    const { name, value } = event.target;
    setSelectedOption(event.target.value);
    setSelectAssignOption(event.target.value);

    console.log(`name: ${name}, value: ${value}`);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    try {
      console.log("form data", formData);
      const response = await axios.post("http://localhost:5087/api/FacilityAsset/FacilityAsset", formData);

      console.log(response.data);
      setFormData({
        assetId: 0,
        assignStatus: "Not Assign",
        assetConditionStatus: "New",
        receivedDate: "",
      });
    } catch (error) {
      console.error(error);
    }
    console.log("formData");
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="assetId"
          value={formData.assetId}
          onChange={handleChange}
          style={{
            border: "2px solid #482890",

            borderRadius: "5px",
            borderColor: "#aaa",
            padding: "8px 10px 7px 0px",
            width: "150px", // Reduce input field width
            marginBottom: "10px", // Adjust the margin to balance the layout
            marginLeft: "10px", // Move the input field further to the left
          }}
        />

        <select
          name="assetConditionStatus"
          value={formData.assetConditionStatus}
          onChange={handleChange}
          autoFocus={true}
          style={{
            width: "150px", // Reduce select field width
            height: "40px",
            border: "2px solid #482890",

            borderRadius: "5px",
            marginTop: "50px",
            marginLeft: "10px", // Move the select field further to the left
            marginBottom: "10px", // Adjust the margin to balance the layout
          }}
        >
          <option value="New">New</option>
          <option value="Use">Use</option>
          <option value="Damage">Damage</option>
        </select>

        <input
          type="date"
          name="receivedDate"
          value={moment(formData.receivedDate).format("YYYY-MM-DD")}
          max={moment().format("YYYY-MM-DD")}
          onChange={handleChange}
          style={{
            border: "2px solid #482890",
            borderRadius: "5px",
            borderColor: "#aaa",
            padding: "8px 30px",
            marginLeft: "10px", // Move the received date input further to the left
            marginBottom: "10px", // Adjust the margin to balance the layout
          }}
        />

        <select
          name="assignStatus"
          style={{
            border: "2px solid #ff615a",
            borderRadius: "5px",
            borderColor: "#aaa",
            padding: "8px 30px",
            marginLeft: "10px", // Move the assign status select field further to the left
            marginBottom: "10px", // Adjust the margin to balance the layout
          }}
        >
          <option value="Assign">Assign</option>
          <option value="Not Assign">Not Assign</option>
        </select>

        <Button
          type="submit"
          style={{
            position: "relative",
            width: "100px",
            left: "30px",
            backgroundColor: "#482890",
            borderColor: "#482890",
            marginLeft:"-20px"
          }}
        >
          Add
        </Button>
      </form>

      <Button
        style={{
          float: "right",
          
          backgroundColor: "#ff615a",
          borderColor: "#ff615a",
          marginRight: "20px",
          marginTop:"-47px",
           

        }}
      >
        Assign Asset
      </Button>
    </div>
  );
}

export default FacilityAssetForm;
