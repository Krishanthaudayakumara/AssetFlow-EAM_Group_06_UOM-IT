import React, { useState, useEffect, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form, Modal } from "react-bootstrap";
import axios from "axios";

interface TaskData {
  id: number;
  taskType: string;
}

interface BuildingData {
  id: number;
  buildingName: string;
}

interface CleaningStaff {
  id: number;
  firstName: string;
  lastName: string;
  middleName: string;
}

function AddTaskForm() {
  const [tasks, setTasks] = useState<TaskData[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number | undefined>(undefined);
  const [buildingNames, setBuildingNames] = useState<BuildingData[]>([]);
  const [selectedBuildingId, setSelectedBuildingId] = useState<number | undefined>(undefined);
  const [externalEmployees, setExternalEmployees] = useState<CleaningStaff[]>([]);
  const [selectedExternalEmployeeId, setSelectedExternalEmployeeId] = useState<number | undefined>(undefined);
  const [assignedDate, setAssignedDate] = useState<string>("");
  const [selectedStatus, setSelectedStatus] = useState<string>("inProgress");
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/AssignTask");
        const data = response.data;
        setTasks(data);
      } catch (error) {
        alert("Error fetching tasks: " + error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchBuildingNames = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/Building");
        const data = response.data;
        setBuildingNames(data);
      } catch (error) {
        alert("Error fetching building names: " + error);
      }
    };

    fetchBuildingNames();
  }, []);

  useEffect(() => {
    const fetchExternalEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/ExternalWorker");
        const data = response.data;
        setExternalEmployees(data);
      } catch (error) {
        alert("Error fetching external employees: " + error);
      }
    };

    fetchExternalEmployees();
  }, []);

  const handleTaskIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTaskId = parseInt(event.target.value);
    setSelectedTaskId(selectedTaskId);
  };

  const handleBuildingIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBuildingId = parseInt(event.target.value);
    setSelectedBuildingId(selectedBuildingId);
  };

  const handleExternalEmployeeIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedExternalEmployeeId = parseInt(event.target.value);
    setSelectedExternalEmployeeId(selectedExternalEmployeeId);
  };

  const handleAssignedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setAssignedDate(date);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setSelectedStatus(selectedStatus);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = {
      taskType: selectedTaskId,
      buildingId: selectedBuildingId,
      externalWorkerId: selectedExternalEmployeeId,
      taskDate: assignedDate,
      taskStatus: selectedStatus,
    };

    try {
      const response = await axios.put(`http://localhost:5087/api/AssignTask/${selectedTaskId}`, data);
      if (response.status === 200) {
        alert("Task updated successfully!");
        handleCloseModal();
      } else {
        alert("An error occurred while updating the task.");
      }
    } catch (error) {
      alert("Error updating task: " + error);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  return (
    <>
      <Button variant="primary" onClick={handleOpenModal}>
        Assign Task
      </Button>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="task">
              <Form.Label>Task:</Form.Label>
              <Form.Select onChange={handleTaskIdChange}>
                <option value="">-- Please Select Task --</option>
                {tasks.map((task) => (
                  <option key={task.id} value={task.id}>
                    {task.taskType}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="buildingName">
              <Form.Label>Building Name:</Form.Label>
              <Form.Select onChange={handleBuildingIdChange}>
                <option value="">-- Please Select Building Name --</option>
                {buildingNames.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.buildingName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="assignedTo">
              <Form.Label>Assigned to:</Form.Label>
              <Form.Select onChange={handleExternalEmployeeIdChange}>
                <option value="">-- Please Select External Employee --</option>
                {externalEmployees.map((employee) => (
                  <option key={employee.id} value={employee.id}>
                    {`${employee.firstName} ${employee.middleName} ${employee.lastName}`}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group controlId="assignedDate">
              <Form.Label>Assigned Date:</Form.Label>
              <Form.Control type="date" value={assignedDate} onChange={handleAssignedDateChange} />
            </Form.Group>

            <Form.Group controlId="status">
              <Form.Label>Status:</Form.Label>
              <Form.Select value={selectedStatus} onChange={handleStatusChange}>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
              </Form.Select>
            </Form.Group>

            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default AddTaskForm;
