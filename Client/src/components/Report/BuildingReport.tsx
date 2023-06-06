import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';

interface BuildingReportProps {
  fromDate: string;
  toDate: string;
}

interface BuildingInventoryReport {
  id: number
  buildingName: string;
  floorNo: number;
  numWorkstations: number;
  numAssets: number;
}

const BuildingReport: React.FC<BuildingReportProps> = ({  }) => {
  const [buildings, setBuildingReports] = useState<BuildingInventoryReport[]>([]);

  useEffect(() => {
    fetchBuildingReports();
  }, []);

  const fetchBuildingReports = async () => {
    try {
      const response = await axios.get('http://localhost:5087/api/BuildingInventoryReport/building-inventory-report');
      setBuildingReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Fragment>
      <div className="shadow p-3 bg-white rounded" style={{ margin: '30px 0 0 65px' }}>
        <Table className="table w-100 small table-borderless table-responsive align-middle align-left" hover style={{ fontSize: '13px' }}>
          <thead>
            <tr style={{ color: '#482890' }}>
         
              <th>Building Name</th>
              <th>Floor Number</th>
              <th>Number of Workstations</th>
              <th>Number of Assets</th>
            </tr>
          </thead>
          <tbody>
            {buildings.map((building) => (
              <tr key={building.id}>
                
                <td className="text-secondary">{building.buildingName}</td>
                <td className="text-secondary">{building.floorNo}</td>
                <td className="text-secondary">{building.numWorkstations}</td>
                <td className="text-secondary">{building.numAssets}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}

export default BuildingReport;
