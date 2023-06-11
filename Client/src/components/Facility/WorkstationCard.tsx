import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Facilitycss/workstationcard.css";
import { FaMouse } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Button, Modal, Alert } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import AssetCard from "./AssetCard";
import AssignAssetForm from "./AssignAssetForm";
import { FaTrashAlt, FaPen } from "react-icons/fa";

import axios from "axios";

type WorkstationProp = {
  workstationName: string;
  id: number;
};

export default function WorkstationCard(props: WorkstationProp) {
  const [showModal, setShowModal] = useState(false);
  const [subcategoryCount, setSubcategoryCount] = useState<number>(0);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [updateWorkstationName, setUpdateWorkstationName] = useState("");
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [showUpdateSuccessModal, setShowUpdateSuccessModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    fetchSubcategoryCount();
  }, []);

  const fetchSubcategoryCount = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5087/api/Workstation/GetSubCategoryCount/${props.id}`
      );
      setSubcategoryCount(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleIconClick = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleDeleteWorkstation = async () => {
    setShowConfirmModal(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(
        `http://localhost:5087/api/Workstation/delete-asset-by-id/${props.id}`
      );

      setShowConfirmModal(false);
      setShowSuccessModal(true);
    } catch (error: any) {
      if (error.response && error.response.status === 409) {
        setErrorMessage(error.response.data);
      } else {
        // Handle other errors
      }
    } finally {
      setShowConfirmModal(false);
    }
  };

  const handleCloseConfirmModal = () => {
    setShowConfirmModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
    window.location.reload();
  };

  const handleUpdateWorkstation = () => {
    setUpdateWorkstationName(props.workstationName);
    setShowUpdateModal(true);
  };

  const handleUpdateWorkstationNameChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUpdateWorkstationName(e.target.value);
  };

  const handleUpdateWorkstationNameSubmit = async () => {
    try {
      await axios.put(
        `http://localhost:5087/api/Workstation/${props.id}`,
        { workstationName: updateWorkstationName }
      );
      // Close the update modal and refresh the page
      setShowUpdateModal(false);
      setShowUpdateSuccessModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCloseUpdateSuccessModal = () => {
    setShowUpdateSuccessModal(false);
    // Reload the page or perform any other desired action
    window.location.reload();
  };

  return (
    <div className="col-4 card-container">
      
      {errorMessage && (
          <div className="alert alert-danger">{errorMessage}</div>
        )}
      <div className="ws-card">
        <h6 className="workstation">{props.workstationName}</h6>

        {subcategoryCount > 0 && (
          <AssetCard
            workstationId={props.id}
            subcategoryCount={subcategoryCount}
          />
        )}

        <div className="icon-container">
          <IoAdd
            style={{ width: "30px", height: "30px" }}
            onClick={handleIconClick}
          />
          <FaTrashAlt onClick={handleDeleteWorkstation} />
          <FaPen onClick={handleUpdateWorkstation} />
        </div>
        
      

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Assign Assets</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <AssignAssetForm id={props.id} />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showConfirmModal} onHide={handleCloseConfirmModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirm Delete</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Are you sure you want to delete this workstation?
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseConfirmModal}>
              Cancel
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Delete
            </Button>
          </Modal.Footer>
        </Modal>

       
       
        <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Workstation deleted successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <Modal show={showUpdateModal} onHide={() => setShowUpdateModal(false)}>
          <Modal.Header closeButton>
            <Modal.Title>Update Workstation</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <label htmlFor="updateWorkstationName">Workstation Name:</label>
            <input
              type="text"
              id="updateWorkstationName"
              value={updateWorkstationName}
              onChange={handleUpdateWorkstationNameChange}
            />
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowUpdateModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" onClick={handleUpdateWorkstationNameSubmit}>
              Update
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={showUpdateSuccessModal} onHide={handleCloseUpdateSuccessModal}>
          <Modal.Header closeButton>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>Workstation name updated successfully!</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseSuccessModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

      </div>
    </div>
  );
}
