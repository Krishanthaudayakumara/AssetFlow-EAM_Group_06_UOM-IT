import React, { useEffect, useState } from "react";
import axios from "axios";

import { Table } from "react-bootstrap";

interface FacilityStockData {
    assetId: number;
    description: string;
    vendor: string;
    subCategoryId: number;
    categoryId: number;
    facilityAssetId: number;
}

function FacilityAssetStock() {
  const [facilityStockData, setFacilityStockData] = useState< FacilityStockData[]>([]);

  useEffect(() => {
    const fetchFacilityAssetStockData = async () => {
      try {
        const response = await axios.get<FacilityStockData[]>(
          "http://localhost:5087/api/FacilityAsset"
          
        );
        setFacilityStockData(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchFacilityAssetStockData();
  }, []);

    

  return (
    <div style={{ margin: "5rem" }}>
      <div
        className="shadow p-2 mb- bg-white rounded"
        style={{ width: "800px" }}
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
              <th>Description</th>
              <th colSpan={1}>Vendor</th>
              <th>SubCategory Id</th>
              <th>Category Id</th>
              <th>Asset Id</th>
            </tr>
          </thead>
          <tbody>
            {facilityStockData && facilityStockData.length > 0 ? (
              facilityStockData.map((item) => {
                return (
                  <tr
                    key={item.facilityAssetId}
                    style={{ textAlign: "center" }}
                  >
                    <td>{item.facilityAssetId}</td>
                    <td>{item.description}</td>
                    <td>{item.vendor}</td>
                    <td>{item.subCategoryId}</td>
                    <td>{item.categoryId}</td>
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
