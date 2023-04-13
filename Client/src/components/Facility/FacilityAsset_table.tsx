import React, { useEffect } from "react";
import Table from "react-bootstrap/Table";
import { useState } from "react";
import { FaTrashAlt, FaPen } from "react-icons/fa";
import { Button, Modal } from "react-bootstrap";
import axios from "axios";

interface FacilityAssetData {
  id: number;
  assetId: number;
  assetConditionStatus: string;
  assignedDate: string;
  receivedDate: string;
  assignStatus: string;
  workstationId:number;
}

function FacilityAssetTable() {
  const [facilityData, setFacilityData] = useState<FacilityAssetData[]>( []);
   
 

  useEffect(() => {
    const fetchFacilityAssetData = async () => {
      try {
        const response = await axios.get<FacilityAssetData[]>(
        "http://localhost:5087/api/FacilityAsset/GetAllFacilityAssets"
        

          
          
          
        );
        console.log(response);
        setFacilityData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchFacilityAssetData();
  }, []);

  return (
    <div style={{ margin: "4rem" }}>
      
      <div
        className="shadow p-2 mb- bg-white rounded"
        style={{ width: "950px" }}
      >
        <Table
          className="table w-100 small text-center"
          hover
          align="center"
          style={{ fontSize: "14px", width: "500px" }}
        >
          <thead>
            <tr style={{ color: "#482890" }}>
              <th>FacilityAsset id</th>
              <th>Asset id</th>
              <th colSpan={1}>Assetcondition status</th>

              <th>Received date</th>
              <th>Assign Status</th>
              <th>Assigned date</th>
              <th>workstationId</th>
            

              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {facilityData && facilityData.length > 0 ? (
              facilityData.map((item) => {
                return (
                  <tr
                    key={item.id}
                    style={{ textAlign: "center" }}
                  >
                    <td>{item.id}</td>
                    <td>{item.assetId}</td>
                    <td>{item.assetConditionStatus}</td>
                    <td>{item.receivedDate}</td>
                    <td>{item.assignStatus}</td>
                    <td>{item.assignedDate}</td>
                    <td>{item.workstationId}</td>
                    
                    <td>
                      <FaTrashAlt style={{ color: " #ff615a " }} />
                      <FaPen
                        style={{ color: " #482890", marginLeft: "10px" }}
                      />
                    </td>
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
export default FacilityAssetTable;
