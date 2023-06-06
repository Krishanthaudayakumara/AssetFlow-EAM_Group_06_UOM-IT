import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Table } from 'react-bootstrap';
import axios from 'axios';

interface WarrentyExpirationReportDTO {
  assetId: number;
  barcode: string;
  description: string;
  vendor: string;
  warrantyExpiration: string;
  status: string;
  purchasedDate: string;
  cost: number;
  supplierId: number;
  amount: number;
}

interface WarrentyExpirationReportProps {
  fromDate: string;
  toDate: string;
}

const WarrentyExpirationReport: React.FC<WarrentyExpirationReportProps> = ({ fromDate, toDate }) => {
  const [report, setReport] = useState<WarrentyExpirationReportDTO[]>([]);

  useEffect(() => {
    axios
      .get('http://localhost:5087/api/WarrentyExpirationReport')
      .then((response) => {
        const data = response.data.filter((item: WarrentyExpirationReportDTO) => {
          if (fromDate && toDate) {
            const from = new Date(fromDate);
            const to = new Date(toDate);
            const warrantyExpirationDate = new Date(item.warrantyExpiration);

            return warrantyExpirationDate >= from && warrantyExpirationDate <= to;
          } else if (fromDate) {
            const from = new Date(fromDate);
            const warrantyExpirationDate = new Date(item.warrantyExpiration);

            return warrantyExpirationDate >= from;
          } else if (toDate) {
            const to = new Date(toDate);
            const warrantyExpirationDate = new Date(item.warrantyExpiration);

            return warrantyExpirationDate <= to;
          } else {
            return true;
          }
        });

        setReport(data);
      })
      .catch((error) => {
        console.error('Error fetching warranty expiration report:', error);
      });
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
              <th>Status</th>
              <th>Purchased Date</th>
              <th>Cost</th>
              <th>Supplier ID</th>
              <th>Amount</th>
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
                <td className="text-secondary">{item.status}</td>
                <td className="text-secondary">{item.purchasedDate}</td>
                <td className="text-secondary">{item.cost}</td>
                <td className="text-secondary">{item.supplierId}</td>
                <td className="text-secondary">{item.amount}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Fragment>
  );
}

export default WarrentyExpirationReport;
