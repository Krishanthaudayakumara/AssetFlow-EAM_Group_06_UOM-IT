import React, { Fragment, useState, useEffect } from 'react';
import { Button, Modal, Table } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import AgentReport from './AgentReport';
import TicketReport from './TicketReport';

interface GeneratedReport {
id: number;
date: string;
reportName: string;
reportType: string;
reportFormat: string;
generatedBy: string;
note: string;
}

const ReportButton: React.FC = () => {
const [showModal, setShowModal] = useState(false);
const [reports, setReports] = useState<GeneratedReport[]>([]);
const [reportType, setReportType] = useState<string>('');

  




const handleShowModal = async () => {
try {
const response = await axios.get('/api/generatedreports');
setReports(response.data);
} catch (error) {
console.error(error);
}
setShowModal(true);
};

const handleCloseModal = () => {
setShowModal(false);
};

return (
<div>
<div className='container'>
<div className='row'>
<div className='col-9' style={{ padding: '0 0 0 450px' }}>
<Button
variant='outline-primary'
type='button'
style={{
backgroundColor: 'white',
borderColor: '#331c7a',
color: '#331c7a',
}}
>
Export to Excel
</Button>
</div>
<div className='col-3' style={{ padding: '0 0 0 0' }}>
<Button
variant='outline-primary'
type='button'
style={{
backgroundColor: 'white',
borderColor: '#482890',
color: '#482890',
}}
onClick={handleShowModal}
>
Report History
</Button>
</div>
</div>
</div>


<Modal show={showModal} onHide={handleCloseModal}>
    <Modal.Header closeButton>
      <Modal.Title>Report History</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <Fragment>
        <div
          className='shadow p-3 bg-white rounded'
          style={{ margin: '30px 0 0 1px' }}
        >
          <Table
            className='table w-100 small table-borderless table-responsiv align-middle align-left'
            hover
            style={{ fontSize: '14px' }}
          >
            <thead>
              <tr>
                <th>Date</th>
                <th>Report Name</th>
                <th>Report Type</th>
                <th>Report Format</th>
                <th>Report generatedBy</th>
                <th>Report note</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.date}</td>
                  <td>{report.reportName}</td>
                  <td>{report.reportType}</td>
                  <td>{report.reportFormat}</td>
                  <td>{report.generatedBy}</td>
                  <td>{report.note}</td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </Fragment>
    </Modal.Body>
    <Modal.Footer>
      <Button variant='secondary' onClick={handleCloseModal}>
        Close
      </Button>
    </Modal.Footer>
  </Modal>
</div>
);
};

export default ReportButton

