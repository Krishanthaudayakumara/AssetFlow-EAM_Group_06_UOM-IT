import React, { useEffect, useState } from "react";

import axios from "axios";
import { Button, Modal } from "react-bootstrap";
import RequestForm from "./RequestForm";
import "./../../css/Table.css";

import { Table } from "react-bootstrap";

interface FacilityStockData {
  assetId: number;
  assetName: string;
  description: string;
  subCategoryType: string;
  categoryType: string;
  stockImageUrl: string;
  facilityAssetId: number;
}

function FacilityAssetStock() {
  const [facilityStockData, setFacilityStockData] = useState<FacilityStockData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedAssetId, setSelectedAssetId] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);


  

  useEffect(() => {
    const fetchFacilityAssetStockData = async () => {
      try {
        const response = await axios.get<FacilityStockData[]>("http://localhost:5087/api/FacilityAsset");
        setFacilityStockData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchFacilityAssetStockData();
  }, []);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    

    
  };
  const handleClick = async () => {
    setIsLoading(true);

    try {
      const response = await axios.post('http://localhost:5087/api/FacilityAsset');
     
      if (response.data === true) {
        console.log('Facility created successfully!');
      } else {
        console.error('Failed to create facility.');
      }
    } catch (error) {
      console.error('An error occurred:', error);
    }

    setIsLoading(false);
  };
  

  return (
    <div style={{ margin: "5rem" }}>
      <Button variant="secondary" onClick={openModal}>
        Request
      </Button>
      <Button variant="secondary" onClick={handleClick} disabled={isLoading}>
      {isLoading ? 'Loading...' : 'Accept'}
    </Button>
      <Modal show={showModal} onHide={closeModal}>
        <Modal.Header closeButton>
          <Modal.Title>Request Form</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <RequestForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeModal}>
            Close
          </Button>
         
        </Modal.Footer>
      </Modal>

      <div className="shadow p-2 mb- bg-white rounded" style={{ width: "800px" }}>
      
        <Table
          className="table"
          
        >
          <thead>
            <tr style={{ color: "#482890" }}>
              <th>FacilityAsset id</th>
              <th>AssetName</th>
              <th colSpan={1}>Description</th>
              <th>SubCategory Type</th>
              <th>Category Type</th>
              <th>AssetId</th>
            </tr>
          </thead>
          <tbody>
            {facilityStockData && facilityStockData.length > 0 ? (
              facilityStockData.map((item) => {
                return (
                  <tr key={item.facilityAssetId} style={{ textAlign: "center" }}>
                    <td>{item.facilityAssetId}</td>
                    <td>{item.assetName}</td>
                    <td>{item.description}</td>
                    <td>{item.subCategoryType}</td>
                    <td>{item.categoryType}</td>
                    <td>{item.assetId}</td>
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
    </div>
  );
}

export default FacilityAssetStock;
