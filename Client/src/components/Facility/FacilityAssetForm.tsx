import React, { useState,useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button } from "react-bootstrap";
import axios from "axios";
import moment from "moment";

function FacilityAssetForm() {
  const [selectedOption, setSelectedOption] = useState("");
  const [selectAssignOption,setSelectAssignOption]=useState("");

  // model to crate the object related to facility asset data
  interface FacilityAssetData {
    assetConditionStatus: string;
    receivedDate: string;
    assetId: number;
    assignStatus:string;
  }

  const [formData, setFormData] = useState<FacilityAssetData>({
    assetConditionStatus: "New", // Set the initial value to "new"
    assignStatus:"Not Assign",
    receivedDate: "",
    assetId: 0,
  });

  const handleChange = (
    event: React.ChangeEvent<HTMLSelectElement & HTMLInputElement>
  ): void => {
    const { name, value } = event.target;
    setSelectedOption(event.target.value);
    setSelectAssignOption(event.target.value);

    console.log(`name: ${name}, value: ${value}`);

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (
    e: React.FocusEvent<HTMLFormElement>
  ): Promise<void> => {
    e.preventDefault();
    try {
      console.log("form data" + formData);
      const response = await axios.post(
        "http://localhost:5087/api/FacilityAsset/FacilityAsset",
        formData
      );

      console.log(response.data);
      setFormData({
        assetId: 0,
        assignStatus:"Not Assign",
        assetConditionStatus: "New", // Set the initial value to "new"
        receivedDate: "",
      });
    } catch (error) {
      console.error(error);
    }
    console.log("formData");
  };

  // const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) =>:void {
  //   setSelectedOption(event.target.value);
  // };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="assetId"
          value={formData.assetId}
          onChange={handleChange}
          style={{
            border: "1px solid #c4c4c4",
            borderRadius: "5px",
            borderColor: "#aaa",
            padding: "8px 10px 7px 0px",
          }}
        />

        <select
          name="assetConditionStatus"
          value={formData.assetConditionStatus}
          onChange={handleChange}
          autoFocus={true}
          style={{
            width: "200px",
            height: "40px",
            borderColor: "#aaa",
            borderRadius: "5px",

            margin: "50px 0px 0px 20px",
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
            border: "1px solid #c4c4c4",
            borderRadius: "5px",
            borderColor: "#aaa",
            padding: "8px 30px",
            marginLeft: "20px",
          }}
        />

        <select
          name="assignStatus"
          style={{
            border: "1px solid #c4c4c4",
            borderRadius: "5px",
            borderColor: "#aaa",
            padding: "8px 30px",
            marginLeft: "20px",
          }}
        >
          
          <option value="Assign">Assign</option>
          <option value="not Assign">Not Assign</option>
        </select>
        <Button
          type="submit"
          style={{
            position: "relative",
            width: "100px",
            left: "30px",
            backgroundColor: "#482890",
            
            borderColor: "#482890!important",
          }}
        >
          Add
        </Button>
      </form>
      <Button
        style={{
          
          float:"right",
          marginTop: "-40px",
          backgroundColor: "#ff615a ",
          borderColor: "#ff615a ",
        }}
      >
        Assign Asset
      </Button>
    </div>
  );
}

export default FacilityAssetForm;
