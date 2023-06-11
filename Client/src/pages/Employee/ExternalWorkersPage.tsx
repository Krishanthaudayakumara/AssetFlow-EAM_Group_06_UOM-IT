import React, { useEffect, useState } from "react";
import { Button, Spinner, Modal } from "react-bootstrap";
import { BsPencilSquare, BsTrash, BsUpload, BsDownload } from "react-icons/bs";
import {
  getExternalWorkers,
  addExternalWorker,
  deleteExternalWorker,
  exportToExcel,
  importFromExcel,
  getSampleExcelFile,
} from "../../api/externalWorkerApi";
import { Department, ExternalWorker } from "../../types";
import ExternalWorkersTable from "../../components/ExternalWorker/ExternalWorkersTable";
import ExternalWorkerFormModal from "../../components/ExternalWorker/ExternalWorkerFormModal";
import ConfirmationModal from "../../components/ExternalWorker/ConfirmationModal";
import { fetchDepartments } from "../../api/departmentApi";

const ExternalWorkersPage: React.FC = () => {
  const [externalWorkers, setExternalWorkers] = useState<ExternalWorker[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFormModalOpen, setIsFormModalOpen] = useState(false);
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [isExportModalOpen, setIsExportModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedWorker, setSelectedWorker] = useState<ExternalWorker | null>(
    null
  );
  const [departments, setDepartments] = useState<Department[]>([]);

  useEffect(() => {
    loadExternalWorkers();
    loadDepartments();
  }, []);

  const loadExternalWorkers = async () => {
    setIsLoading(true);
    try {
      const response = await getExternalWorkers(false);
      setExternalWorkers(response.data);
    } catch (error) {
      console.error("Failed to load external workers:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadDepartments = async () => {
    try {
      const response = await fetchDepartments();
      setDepartments(response);
    } catch (error) {
      console.error("Failed to load departments:", error);
    }
  };

  const handleAddExternalWorker = () => {
    setIsFormModalOpen(true);
  };

  const handleEditExternalWorker = (worker: ExternalWorker) => {
    setSelectedWorker(worker);
    setIsFormModalOpen(true);
  };

  const handleDeleteExternalWorker = async (id: any) => {
    try {
      await deleteExternalWorker(id);
      console.log("Deleted external worker:", id);
      loadExternalWorkers();
    } catch (error) {
      console.error("Failed to delete external worker:", error);
    }
  };

  const handleFormModalClose = () => {
    setSelectedWorker(null);
    setIsFormModalOpen(false);
  };

  const handleFormModalSubmit = async (formData: ExternalWorker) => {
    if (selectedWorker) {
      // Perform edit operation
      try {
        // Call the API to update the external worker
        console.log("Updated external worker:", formData);
        loadExternalWorkers();
        setIsFormModalOpen(false);
      } catch (error) {
        console.error("Failed to edit external worker:", error);
      }
    } else {
      // Perform add operation
      try {
        // Call the API to add the external worker
        console.log("Added external worker:", formData);
        loadExternalWorkers();
        setIsFormModalOpen(false);
      } catch (error) {
        console.error("Failed to add external worker:", error);
      }
    }
  };

  const handleImportModalOpen = () => {
    setIsImportModalOpen(true);
  };

  const handleImportModalClose = () => {
    setIsImportModalOpen(false);
  };
  const handleImportModalSubmit = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const fileInput = document.getElementById("fileInput") as HTMLInputElement;

    if (fileInput && fileInput.files && fileInput.files.length > 0) {
      const file = fileInput.files[0];
      try {
        await importFromExcel(file);
        console.log("Imported external workers");
        loadExternalWorkers();
        setIsImportModalOpen(false);
      } catch (error) {
        console.error("Failed to import external workers:", error);
      }
    }
  };

  const handleExportModalOpen = () => {
    setIsExportModalOpen(true);
  };

  const handleExportModalClose = () => {
    setIsExportModalOpen(false);
  };

  const handleExportModalSubmit = async (includeDeleted: any) => {
    try {
      const response = await exportToExcel(false);
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "ExternalWorkers.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExportModalOpen(false);
    } catch (error) {
      console.error("Failed to export external workers:", error);
    }
  };

  const handleDownloadSampleExcel = async () => {
    try {
      const response = await getSampleExcelFile();
      const blob = new Blob([response.data], {
        type: "application/octet-stream",
      });
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "SampleExternalWorkers.xlsx");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Failed to download sample Excel file:", error);
    }
  };

  const handleDeleteModalOpen = () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedWorker) {
      try {
        await deleteExternalWorker(selectedWorker.id);
        console.log("Deleted external worker:", selectedWorker.id);
        loadExternalWorkers();
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Failed to delete external worker:", error);
      }
    }
  };

  return (
    <div>
      <h2>External Workers</h2>
      <Button variant="primary" onClick={handleAddExternalWorker}>
        Add External Worker
      </Button>
      <Button variant="secondary" onClick={handleImportModalOpen}>
        <BsUpload /> Import from Excel
      </Button>
      <Button variant="secondary" onClick={handleExportModalOpen}>
        <BsDownload /> Export to Excel
      </Button>
      <Button variant="secondary" onClick={handleDownloadSampleExcel}>
        Download Sample Excel
      </Button>
      {isLoading ? (
        <Spinner animation="border" variant="primary" />
      ) : (
        <ExternalWorkersTable
          externalWorkers={externalWorkers}
          departments={departments} // Pass the departments data as a prop
          handleEditExternalWorker={handleEditExternalWorker}
          handleDeleteExternalWorker={handleDeleteExternalWorker}
        />
      )}

      <ExternalWorkerFormModal
        isOpen={isFormModalOpen}
        onClose={handleFormModalClose}
        onSubmit={handleFormModalSubmit}
        initialData={selectedWorker}
      />

      <Modal show={isImportModalOpen} onHide={handleImportModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Import from Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add file input field and submit button for import */}
          <input type="file" id="fileInput" accept=".xlsx, .xls" />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleImportModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleImportModalSubmit}>
            Import
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={isExportModalOpen} onHide={handleExportModalClose}>
        <Modal.Header closeButton>
          <Modal.Title>Export to Excel</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Add options for including deleted workers and submit button for export */}
          <input type="checkbox" id="includeDeleted" />
          <label htmlFor="includeDeleted">Include deleted workers</label>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleExportModalClose}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleExportModalSubmit}>
            Export
          </Button>
        </Modal.Footer>
      </Modal>

      <ConfirmationModal
        isOpen={isDeleteModalOpen} // Update prop name from 'show' to 'isOpen'
        onHide={handleDeleteModalClose}
        onConfirm={handleConfirmDelete}
        title="Delete External Worker"
        message="Are you sure you want to delete this external worker?"
      />
    </div>
  );
};

export default ExternalWorkersPage;
