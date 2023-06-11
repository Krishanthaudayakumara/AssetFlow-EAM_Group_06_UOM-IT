import React, { useState } from "react";
import { Button, Table } from "react-bootstrap";
import { BsPencilSquare, BsTrash } from "react-icons/bs";
import { Department, ExternalWorker } from "../../types";
import ConfirmationModal from "./ConfirmationModal";

interface ExternalWorkersTableProps {
  externalWorkers: ExternalWorker[];
  departments: Department[];
  handleEditExternalWorker: (worker: ExternalWorker) => void;
  handleDeleteExternalWorker: (id: number) => void;
}

const ExternalWorkersTable: React.FC<ExternalWorkersTableProps> = ({
  externalWorkers,
  departments,
  handleEditExternalWorker,
  handleDeleteExternalWorker,
}) => {
  const [selectedWorker, setSelectedWorker] = useState<ExternalWorker | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const getDepartmentName = (departmentId: number) => {
    const department = departments.find((dept) => dept.id === departmentId);
    return department ? department.name : "";
  };

  const handleDeleteClick = (worker: ExternalWorker) => {
    setSelectedWorker(worker);
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  const handleConfirmDelete = async () => {
    if (selectedWorker) {
      try {
        await handleDeleteExternalWorker(selectedWorker.id);
        setIsDeleteModalOpen(false);
      } catch (error) {
        console.error("Failed to delete external worker:", error);
      }
    }
  };

  return (
    <div>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Job Title</th>
            <th>Hire Date</th>
            <th>Department</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {externalWorkers.map((worker) => (
            <tr key={worker.id}>
              <td>{worker.id}</td>
              <td>{worker.firstName}</td>
              <td>{worker.lastName}</td>
              <td>{worker.jobTitle}</td>
              <td>{worker.hireDate}</td>
              <td>{getDepartmentName(worker.departmentId)}</td>
              <td>
                <Button
                  variant="warning"
                  size="sm"
                  onClick={() => handleEditExternalWorker(worker)}
                >
                  <BsPencilSquare />
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDeleteClick(worker)}
                >
                  <BsTrash />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        onHide={handleDeleteModalClose}
        onConfirm={handleConfirmDelete}
        title="Delete External Worker"
        message="Are you sure you want to delete this external worker?"
      />
    </div>
  );
};

export default ExternalWorkersTable;
