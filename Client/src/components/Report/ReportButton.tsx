import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import axios from 'axios';
import * as XLSX from 'xlsx';

interface ReportButtonProps {
  departmentName: string;
  selectedReportType: string;
  tableRef: React.RefObject<any>;
}

interface FormData {
  reportName: string;
  reportType: string;
  reportFormat: string;
  generatedBy: string;
  note: string;
}

const ReportButton: React.FC<ReportButtonProps> = ({ departmentName, selectedReportType, tableRef }) => {
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    reportName: '',
    reportType: '',
    reportFormat: '',
    generatedBy: '',
    note: '',
  });

  const openModal = () => {
    setFormData((prev) => ({ ...prev, reportName: departmentName, reportType: selectedReportType }));
    setShowModal(true);
  };

  const downloadTableAsExcel = () => {
    const fileType = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    const fileExtension = '.xlsx';

    const ws = XLSX.utils.table_to_book(tableRef.current, { sheet: 'Sheet1' });
    const wbout = XLSX.write(ws, { bookType: 'xlsx', type: 'binary' });

    const buf = new ArrayBuffer(wbout.length);
    const view = new Uint8Array(buf);
    for (let i = 0; i < wbout.length; i++) {
      view[i] = wbout.charCodeAt(i) & 0xff;
    }
    const blob = new Blob([buf], { type: fileType });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `${departmentName}-${selectedReportType}-${Date.now()}${fileExtension}`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const downloadTableAsPDF = () => {
    const tableElement = tableRef.current; // Assuming the tableRef.current represents the HTML table element

    const printWindow = window.open('', '_blank');
    if (printWindow) {
      printWindow.document.write('<html><head><title>Table PDF</title></head><body>');
      printWindow.document.write('<style>table {border-collapse: collapse; width: 100%;} th, td {border: 1px solid black; padding: 8px;}</style>');
      printWindow.document.write('<table>');
      printWindow.document.write(tableElement.innerHTML);
      printWindow.document.write('</table>');
      printWindow.document.write('</body></html>');
      printWindow.document.close();

      printWindow.onload = () => {
        printWindow.print();
      };
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (formData.note.length > 20) {
      console.log('Note exceeds the maximum length of 20 characters.');
      return;
    }

    if (formData.reportFormat === 'excel') {
      downloadTableAsExcel();
    } else if (formData.reportFormat === 'pdf') {
      downloadTableAsPDF();
    }
    setShowModal(false);
    try {
      const response = await axios.post('http://localhost:5087/api/GeneratedReport', formData);
      console.log(response.data);
      // Show success modal
      setShowSuccessModal(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    if (event.target.name === 'note' && event.target.value.length > 20) {
      return; // Do not update the state if the length exceeds 20 characters
    }
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <div>
      <div className="container">
        <div className="row">
          <div className="col-9" style={{ padding: '0 0 0 600px' }}>
            <Button
              variant="outline-primary"
              type="button"
              style={{
                backgroundColor: 'white',
                borderColor: '#331c7a',
                color: '#331c7a',
              }}
              onClick={openModal}
            >
              Download
            </Button>
          </div>
          <div className="col-3" style={{ padding: '0 0 0 0' }}>
            <Link to="/ReportHistory">
              <Button
                variant="outline-primary"
                type="button"
                style={{
                  backgroundColor: 'white',
                  borderColor: '#482890',
                  color: '#482890',
                }}
              >
                Report History
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Download</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="reportName">Report Name:</label>
              <input
                type="text"
                className="form-control"
                name="reportName"
                onChange={handleChange}
                value={formData.reportName}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reportType">Report Type:</label>
              <input
                type="text"
                className="form-control"
                name="reportType"
                onChange={handleChange}
                value={formData.reportType}
              />
            </div>
            <div className="form-group">
              <label htmlFor="reportFormat">Report Format:</label>
              <select className="form-control" name="reportFormat" onChange={handleChange} required>
                <option value="">Select Format</option>
                <option value="excel">Excel</option>
                <option value="pdf">PDF</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="generatedBy">Generated By:</label>
              <input
                type="text"
                className="form-control"
                name="generatedBy"
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="note">Note:</label>
              <textarea
                className="form-control"
                name="note"
                onChange={handleChange}
                value={formData.note}
                rows={3}
              ></textarea>
            </div>
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </form>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={() => setShowSuccessModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Report successfully added!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowSuccessModal(false)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default ReportButton;



