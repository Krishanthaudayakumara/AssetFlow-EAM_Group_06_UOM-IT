import React, { Fragment, useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Table, Modal } from 'react-bootstrap';
import axios from 'axios';
import "./../../css/Table.css";

interface GeneratedReport {
  id: number;
  date: string;
  reportName: string;
  reportType: string;
  reportFormat: string;
  generatedBy: string;
  note: string;
}

const ReportHistory = () => {
  const [generatedReports, setGeneratedReports] = useState<GeneratedReport[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedReportId, setSelectedReportId] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredReports, setFilteredReports] = useState<GeneratedReport[]>([]);

  useEffect(() => {
    axios
      .get('https://assetflow.azurewebsites.net/api/GeneratedReport')
      .then((response) => {
        setGeneratedReports(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  useEffect(() => {
    const filtered = generatedReports.filter((report) =>
      report.reportName.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredReports(filtered);
  }, [generatedReports, searchQuery]);

  const handleDelete = (id: number) => {
    setSelectedReportId(id);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    if (selectedReportId) {
      axios
        .delete(`https://assetflow.azurewebsites.net/api/GeneratedReport/${selectedReportId}`)
        .then((response) => {
          console.log(response);
          setGeneratedReports(generatedReports.filter((report) => report.id !== selectedReportId));
          setShowModal(false);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <Fragment>
      <h2  className="table-page-heading">REPORT HISTORY</h2>
      <div
        className="shadow p-3 bg-white rounded"
        style={{ margin: '30px 0 0 65px' }}
      >
        <input
          type="text"
          placeholder="Search by report name..."
          value={searchQuery}
          onChange={handleSearch}
          style={{margin: '30px 0 0 650px' }}
        />
        <Table
          className="table w-100 small table-borderless table-responsive align-middle align-left"
          hover
          style={{ fontSize: '13px' }}
        >
          <thead>
            <tr style={{ color: '#482890' }}>
              <th>ID</th>
              <th>Date</th>
              <th>Report Name</th>
              <th>Report Type</th>
              <th>Report Format</th>
              <th>Generated By</th>
              <th>Note</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredReports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.date}</td>
                <td>{report.reportName}</td>
                <td>{report.reportType}</td>
                <td>{report.reportFormat}</td>
                <td>{report.generatedBy}</td>
                <td>{report.note}</td>
                <td>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(report.id)}>
                    Delete
                  </Button>{' '}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this report?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Fragment>
  );
}

export default ReportHistory;

