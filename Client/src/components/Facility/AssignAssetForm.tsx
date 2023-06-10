import React, { useState, useEffect, ChangeEvent } from "react";
import Form from "react-bootstrap/Form";
import DatePicker from "react-datepicker";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

type AssignAssetFormProps = {
  id: number;
};

interface SubcategoryOption {
  assetId: number;
  subCategoryType: string;
  facilityAssetId: number;
}

function AssignAssetForm(props: AssignAssetFormProps) {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedSubCategory, setSelectedSubCategory] = useState("");
  const [subCategory, setSubCategory] = useState<SubcategoryOption[]>([]);
  const [assetIds, setAssetIds] = useState<number[]>([]);
  const [selectedAssetId, setSelectedAssetId] = useState<number>();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchSubCategoryAndAsset = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5087/api/FacilityAsset"
        );

        const data = response.data;
        console.log(response.data);
        setSubCategory(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchSubCategoryAndAsset();
  }, []);

  const handleSubCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedSubCategory = event.target.value;
    console.log(event.target.value);
    setSelectedSubCategory(selectedSubCategory);

    const relevantAssetIds = subCategory
      .filter((s) => s.subCategoryType === selectedSubCategory)
      .map((s) => s.assetId);

    setAssetIds(relevantAssetIds);

    if (relevantAssetIds.length > 0) {
      setSelectedAssetId(relevantAssetIds[0]);
    } else {
      setSelectedAssetId(0); // No relevant asset found, set selectedAssetId to null
    }
  };

  const handleAssetIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedAssetId = Number(event.target.value);
    console.log(selectedAssetId);
    setSelectedAssetId(selectedAssetId);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent default form submission behavior
    if (selectedSubCategory === "" || selectedAssetId === undefined) {
      alert("Please fill out all the fields.");
      return;
    }

    try {
      const selectedFacilityAsset = subCategory.find(
        (s) => s.assetId === selectedAssetId
      );
      if (!selectedFacilityAsset) {
        alert("Selected AssetId is invalid.");
        return;
      }

      const updateData = {
        AssignedDate: selectedDate,
        WorkstationId: props.id,
        FacilityAssetId: selectedFacilityAsset.facilityAssetId,
      };

      await axios.put(
        `http://localhost:5087/api/FacilityAsset/${selectedFacilityAsset.facilityAssetId}`,
        updateData
      );

      setShowModal(true);

      // Optionally, you can reset the form fields or perform any other actions after successful update
    } catch (error) {
      alert("An error occurred while updating the Facility Asset.");
      console.error(error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <Form onSubmit={handleSubmit}>
      <Form.Group className="mb-3" controlId="workstationId">
        <Form.Label>Workstation Id</Form.Label>
        <Form.Control type="text" value={props.id} readOnly />
      </Form.Group>
      <Form.Group className="mb-3" controlId="subcategory">
        <Form.Label>subcategory</Form.Label>
        <Form.Select onChange={(e) => handleSubCategoryChange(e)}>
          <option value="0">-- Please Select a SubCategory type --</option>
          {subCategory.map((s) => (
            <option key={s.subCategoryType} value={s.subCategoryType}>
              {s.subCategoryType}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3" controlId="AssetId">
        <Form.Label>Asset Id</Form.Label>
        <Form.Select
          value={selectedAssetId}
          onChange={(e) => handleAssetIdChange(e)}
        >
          <option value="0">-- Please Select an Asset Id --</option>
          {assetIds.map((assetId) => (
            <option key={assetId} value={assetId}>
              {assetId}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="AssignedDate">
        <Form.Label>Assigned Date</Form.Label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date || new Date())}
          className="form-control"
          maxDate={new Date()} // Set maxDate prop to restrict selection of future dates
        />
      </Form.Group>

        <Button variant="success" type="submit">
          Assign
        </Button>
      </Form>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Facility Asset updated successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}


export default AssignAssetForm;
