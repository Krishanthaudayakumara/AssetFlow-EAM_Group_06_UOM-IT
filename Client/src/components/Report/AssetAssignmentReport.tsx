import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';

interface AssetAssignmentReportProps {
  fromDate: string;
  toDate: string;
}

interface AssetAssignmentReport {
  assetId: number;
  assetConditionStatus: string;
  workstationType: string;
  assignStatus: string;
  assignedDate: Date | null;
  receivedDate: Date | null;
  buildingName: string;
  floorNo: number;
}

const AssetAssignmentReport: React.FC<AssetAssignmentReportProps> = ({ fromDate, toDate }) => {
  const [assetAssignmentReports, setAssetAssignmentReports] = useState<AssetAssignmentReport[]>([]);

  useEffect(() => {
    fetchAssetAssignmentReports();
  }, [fromDate, toDate]);

  const fetchAssetAssignmentReports = async () => {
    try {
      const response = await axios.get('http://localhost:5087/api/AssetAssignmentReport/asset-assignment-report', {
        params: {
          fromDate: fromDate,
          toDate: toDate,
        },
      });
      setAssetAssignmentReports(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const filterAssetAssignmentReports = (report: AssetAssignmentReport) => {
    const assignedDate = report.assignedDate ? new Date(report.assignedDate) : null;
    const receivedDate = report.receivedDate ? new Date(report.receivedDate) : null;

    if (fromDate && toDate) {
      const from = new Date(fromDate);
      const to = new Date(toDate);

      return (
        (!fromDate || (assignedDate && assignedDate >= from && assignedDate <= to)) &&
        (!toDate || (receivedDate && receivedDate >= from && receivedDate <= to))
      );
    } else if (fromDate) {
      return assignedDate && assignedDate >= new Date(fromDate);
    } else if (toDate) {
      return receivedDate && receivedDate <= new Date(toDate);
    }

    return true;
  };

  const filteredReports = assetAssignmentReports.filter(filterAssetAssignmentReports);

  return (
    <Fragment>
      <div className="shadow p-3 bg-white rounded" style={{ margin: '30px 0 0 65px' }}>
        <Table className="table w-100 small table-borderless table-responsive align-middle align-left" hover style={{ fontSize: '13px' }}>
          <thead>
            <tr style={{ color: '#482890' }}>
              
              <th>AssetId</th>
              <th>AssetConditionStatus</th>
              <th>WorkstationType</th>
              <th>AssignStatus</th>
              <th>AssignedDate</th>
              <th>ReceivedDate</th>
              <th>BuildingName</th>
              <th>FloorNo</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report, index) => (
              <tr key={index}>
              
                <td className="text-secondary">{report.assetId}</td>
                <td className="text-secondary">{report.assetConditionStatus}</td>
                <td className="text-secondary">{report.workstationType}</td>
                <td className="text-secondary">{report.assignStatus}</td>
                <td className="text-secondary">{report.assignedDate?.toLocaleString()}</td>
                <td className="text-secondary">{report.receivedDate?.toLocaleString()}</td>
                <td className="text-secondary">{report.buildingName}</td>
                <td className="text-secondary">{report.floorNo}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}

export default AssetAssignmentReport;


