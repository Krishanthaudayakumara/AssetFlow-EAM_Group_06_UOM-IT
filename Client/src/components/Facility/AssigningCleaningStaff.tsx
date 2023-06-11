import React, { useState, useEffect } from "react";
import { Table, Button, Modal } from "react-bootstrap";
import axios from "axios";
import AddTaskForm from "./AssignStaffForm";
import Badge from "react-bootstrap/Badge";
import { FiCheckCircle } from "react-icons/fi";


interface BuildingData {
  id: number;
  buildingName: string;
  // Add other properties if needed
}

interface AssignTaskData {
  id: number;
  taskType: string;
  taskDate: string;
  taskStatus: string;
  externalWorkerId: number;
  buildingId: number;
  buildingName: string;
}

interface ExternalWorkerData {
  id: number;
  firstName: string;
  middleName: string;
  lastName: string;
}

function AssigningCleaningStaff() {
  const [showModal, setShowModal] = useState(false);
  const [tasks, setTasks] = useState<AssignTaskData[]>([]);
  const [externalWorkers, setExternalWorkers] = useState<ExternalWorkerData[]>(
    []
  );
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);


  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5087/api/AssignTask"
        );
        const data = response.data;
        const updatedTasks = await Promise.all(
          data.map(async (task: AssignTaskData) => {
            const buildingResponse = await axios.get(
              `http://localhost:5087/api/Building/${task.buildingId}`
            );
            const buildingData: BuildingData = buildingResponse.data;
            return { ...task, buildingName: buildingData.buildingName };
          })
        );
        setTasks(updatedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    const fetchExternalWorkers = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5087/api/ExternalWorker"
        );
        const data = response.data;
        setExternalWorkers(data);
      } catch (error) {
        console.error("Error fetching external workers:", error);
      }
    };

    fetchTasks();
    fetchExternalWorkers();
  }, []);

  const handleAssignStaffClick = () => {
    setShowModal(true);
  };

  const getFullName = (externalWorkerId: number) => {
    const externalWorker = externalWorkers.find(
      (worker) => worker.id === externalWorkerId
    );
    if (externalWorker) {
      const { firstName, middleName, lastName } = externalWorker;
      return `${firstName} ${middleName} ${lastName}`;
    }
    return "";
  };

  const handleTaskStatusUpdate = async (event: React.MouseEvent<HTMLButtonElement>) => {
    try {
      if (selectedTaskId) {
        await axios.put(
          `http://localhost:5087/api/AssignTask/Task/${selectedTaskId}`,
          {
            taskStatus: "Completed"
          }
        );
        // Task status updated successfully, perform any necessary updates to the UI
      }
    } catch (error) {
      console.error("Error updating task status:", error);
    } finally {
      setSelectedTaskId(null);
      setShowConfirmationModal(false);
    }
  };
  const handleCheckCircleClick = (taskId: number) => {
    setSelectedTaskId(taskId);
    setShowConfirmationModal(true);
  };

  return (
    <div style={{ margin: "5rem" }}>
      <Button
        variant="primary"
        style={{
          marginTop: "-40px",
          marginLeft: "600px",
          position: "relative",
          marginBottom: "20px",
        }}
        className="hover-change-color"
        onClick={handleAssignStaffClick}
      >
        Assign Staff
      </Button>
      <div
        className="shadow p-2 mb- bg-white rounded"
        style={{ width: "800px" }}
      >
        <Table
          className="table w-100 small text-center"
          hover
          align="center"
          style={{ fontSize: "14px", width: "500px" }}
        >
          <thead>
            <tr style={{ color: "#482890" }}>
              <th>Task</th>
              <th>Building Name</th>
              <th colSpan={1}>Assigned to</th>
              <th>Assigned Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.taskType}</td>
                <td>{task.buildingName}</td>
                <td>{getFullName(task.externalWorkerId)}</td>
                <td>{task.taskDate}</td>
                <td>
                  {task.taskStatus === "NotAssign" ? (
                    <Badge bg="danger" text="white">
                      {task.taskStatus}
                    </Badge>
                  ) : task.taskStatus === "InProgress" ? (
                    <Badge bg="warning" text="white">
                      {task.taskStatus}
                    </Badge>
                  ) : (
                    <Badge bg="success" text="white">
                      {task.taskStatus}
                    </Badge>
                  )}
                </td>
                <td>  <FiCheckCircle
                        style={{ color: " #482890", marginLeft: "10px", cursor: "pointer" }}
                        onClick={() => handleCheckCircleClick(task.id)}
                       
                      /></td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Assign Staff</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <AddTaskForm />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary">Save</Button>
        </Modal.Footer>
      </Modal>
      
      <Modal show={showConfirmationModal} onHide={() => setShowConfirmationModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Task Completion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to mark this task as completed?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowConfirmationModal(false)}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleTaskStatusUpdate}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default AssigningCleaningStaff;
