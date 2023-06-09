import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';

interface WarrantyExpirationReportDTO {
  assetId: number;
  barcode: string;
  description: string;
  vendor: string;
  warrantyExpiration: string;
}

interface WarrantyExpirationReportProps {
  fromDate: string;
  toDate: string;
}

const WarrantyExpirationReport: React.FC<WarrantyExpirationReportProps> = ({ fromDate, toDate }) => {
  const [report, setReport] = useState<WarrantyExpirationReportDTO[]>([]);

  useEffect(() => {
    
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5087/api/WarrantyExpirationReport/warranty-expiration');
        const data = response.data;
    
        if (fromDate && toDate) {
          const from = new Date(fromDate);
          const to = new Date(toDate);
    
          const filteredData = data.filter((item: WarrantyExpirationReportDTO) => {
            const warrantyExpirationDate = new Date(item.warrantyExpiration);
            return warrantyExpirationDate >= from && warrantyExpirationDate >= to;
          });
    
          setReport(filteredData);
        } else {
          setReport(data);
        }
      } catch (error) {
        console.error('Error fetching warranty expiration report:', error);
      }
    };
    
    fetchData();
  }, [fromDate, toDate]);

  return (
    <Fragment>
      <div className="shadow p-3 bg-white rounded" style={{ margin: '30px 0 0 65px' }}>
        <Table className="table w-100 small table-borderless table-responsive align-middle align-left" hover style={{ fontSize: '13px' }}>
          <thead>
            <tr style={{ color: '#482890' }}>
              <th>Asset ID</th>
              <th>Barcode</th>
              <th>Description</th>
              <th>Vendor</th>
              <th>Warranty Expiration</th>
            </tr>
          </thead>
          <tbody>
            {report.map((item) => (
              <tr key={item.assetId}>
                <td className="text-secondary">{item.assetId}</td>
                <td className="text-secondary">{item.barcode}</td>
                <td className="text-secondary">{item.description}</td>
                <td className="text-secondary">{item.vendor}</td>
                <td className="text-secondary">{item.warrantyExpiration}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
};

export default WarrantyExpirationReport;

