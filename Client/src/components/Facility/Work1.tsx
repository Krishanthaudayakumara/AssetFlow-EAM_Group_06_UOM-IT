import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Workstationform from "./Workstationform";
import WorkstationCard from "./WorkstationCard";
import "../../css/Facilitycss/Workstation.css";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";
import "./../../css/Table.css";

interface WorkstationData {
  id: number;
  workstationName: string;
  floor: number;
  buildingId: number;
  buildingName: string;
}

interface BuildingData {
  id: number;
  buildingName: string;
  floorNo: number;
}

export default function Work1() {
  const [show, setShow] = useState(false);
  const [modalTitle, setModalTitle] = useState("Add Workstation");
  const [modalBody, setModalBody] = useState(<Workstationform />);
  const [workArr, setWorkArr] = useState<WorkstationData[]>([]);
  const [buildings, setBuildings] = useState<BuildingData[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | null>(null);
  const [selectedFloor, setSelectedFloor] = useState<number | null>(null);

  const handleClose = () => {
    setShow(false);
    window.location.reload();
  };
  
  const handleAddWorkstation = () => {
    setModalTitle("Add Workstation");
    setModalBody(<Workstationform />);
    setShow(true);
  };

  useEffect(() => {
    const fetchWorkstationData = async () => {
      try {
        const response = await axios.get<WorkstationData[]>("http://localhost:5087/api/Workstation");
        setWorkArr(response.data);
      } catch (error) {
        alert(error);
      }
    };

    const fetchBuildingData = async () => {
      try {
        const response = await axios.get<BuildingData[]>("http://localhost:5087/api/Building");
        setBuildings(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchWorkstationData();
    fetchBuildingData();
  }, []);

  const handleFilterWorkstations = () => {
    const filteredWorkArr = workArr.filter((workstation) => {
      if (selectedBuildingId && selectedFloor) {
        return (
          workstation.buildingId === selectedBuildingId && workstation.floor === selectedFloor
        );
      } else if (selectedBuildingId) {
        return workstation.buildingId === selectedBuildingId;
      }
      return true;
    });
  
    return filteredWorkArr.map((w) => (
      <WorkstationCard key={w.id} workstationName={w.workstationName} id={w.id} /> // Pass the id prop
    ));
  };
  
  

  const handleBuildingIdChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const buildingId = parseInt(event.target.value);
    setSelectedBuildingId(buildingId);
    setSelectedFloor(null);
  };

  const handleFloorChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const floor = parseInt(event.target.value);
    setSelectedFloor(floor);
  };

  const getFloorOptions = () => {
    const selectedBuilding = buildings.find((building) => building.id === selectedBuildingId);
    if (selectedBuilding) {
      const floorOptions = [];
      for (let i = 1; i <= selectedBuilding.floorNo; i++) {
        floorOptions.push(
          <option key={i} value={i}>
            {i}
          </option>
        );
      }
      return floorOptions;
    }
    return null;
  };

  return (
    <div  >
      <h2  className="table-page-heading">ASSIGN ASSET</h2>
      <div className="container mt-4"  >
        <div className="row align-items-center justify-content-center">
          <div className={selectedBuildingId !== null ? "col-3" : "col-4"}>
            <div style={{color:" #331c7a",fontWeight:"bold", borderColor: "#331c7a",
}}
            className="form-group text-center">
              <label>select Building</label>
              <select
                className="form-control"
                value={selectedBuildingId || ""}
                onChange={handleBuildingIdChange}
                style={{border:"2px solid #6610f2"}}
              >
                <option value="">--select buuilding--</option>
                {buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.buildingName}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {selectedBuildingId !== null && (
            <div className={selectedFloor !== null ? "col-3" : "col-4"}>
              <div style={{color:" #331c7a",fontWeight:"bold"}} className="form-group text-center">
                <label>Floor</label>
                <select
                   style={{border:"2px solid #6610f2"}}
                  className="form-control"
                  value={selectedFloor !== null ? selectedFloor : ""}
                  onChange={handleFloorChange}
                >
                  <option value="">All Floors</option>
                  {getFloorOptions()}
                </select>
              </div>
            </div>
          )}
          <div className="col-3 text-center ">
            <button
              type="button"
              className="btn btn-primary mt-4"
              style={{ backgroundColor: " #ff615a",borderColor:"#ff615a " 
               }}

              onClick={handleAddWorkstation}
              data-toggle="modal"
            >
              +Workstation
            </button>
          </div>
        </div>
      </div>
  
      <div className="mainContainer mt-4" >
        <div className="row">
          {selectedBuildingId !== null || selectedFloor !== null ? (
            handleFilterWorkstations()
          ) : workArr && workArr.length > 0 ? (
            workArr.map((w) => (
              <WorkstationCard key={w.id} workstationName={w.workstationName} id={w.id} />
            ))
          ) : (
            <div className="col-12">No data available</div>
          )}
        </div>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{modalTitle}</Modal.Title>
          </Modal.Header>
          <Modal.Body>{modalBody}</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
          }