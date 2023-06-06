import React, { useState, useEffect } from "react";
import Table from "react-bootstrap/Table";
import "../../css/Facilitycss/workstationcard.css";
import { FaMouse } from "react-icons/fa";
import { FaKeyboard } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import { IoAdd } from "react-icons/io5";
import AssetCard from "./AssetCard";
import Workstation from "./Workstationdata";
import AssignAssetForm from "./AssignAssetForm";
import axios from "axios";

type WorkstationProp = {
  workstationName: string;
  id: number;
};

export default function WorkstationCard(props: WorkstationProp) {
  const [showModal, setShowModal] = useState(false);
  const [subcategoryCount, setSubcategoryCount] = useState<number>(0);

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

  return (
    <div className="col-4 card-container">
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
      </div>
    </div>
  );
}
