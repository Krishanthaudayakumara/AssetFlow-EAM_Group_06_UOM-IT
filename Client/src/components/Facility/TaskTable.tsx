import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form } from "react-bootstrap";
import axios from "axios";
import { FaTrashAlt, FaPen } from "react-icons/fa";

interface TaskTypeData {
  taskType: string;
  id: number;
}

function TaskTable() {
  const [task, setTask] = useState<TaskTypeData[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [taskTypeInput, setTaskTypeInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [showDeleteConfirmationModal, setShowDeleteConfirmationModal] =useState(false);
    
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [editedTaskType, setEditedTaskType] = useState("");
  const[showEditModal,setShowEditModal]=useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleAddTask = async () => {
    // Check if the task type already exists in the list
    const taskExists = task.some((t) => t.taskType === taskTypeInput);
    if (taskExists) {
      setShowAlert(true);
      return;
    }

    try {
      const response = await axios.post<TaskTypeData>(
        "http://localhost:5087/api/AssignTask",
        {
          taskType: taskTypeInput,
        }
      );
      setTask([...task, response.data]);
      setTaskTypeInput("");
      handleCloseModal();
      setShowSuccessModal(true);
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status === 409) {
        setErrorMessage("Already has Added this task.");
      }
    }
  };

  const handleTaskTypeInputChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTaskTypeInput(e.target.value);
  };

  // Fetch task data on component mount
  useEffect(() => {
    const fetchTaskData = async () => {
      try {
        const response = await axios.get<TaskTypeData[]>(
          "http://localhost:5087/api/AssignTask"
        );
        setTask(response.data);
      } catch (error) {
        alert(error);
      }
    };

    fetchTaskData();
  }, []);

  const handleOpenDeleteConfirmationModal = (taskId: number) => {
    setSelectedTaskId(taskId);
    setShowDeleteConfirmationModal(true);
  };

  const handleCloseDeleteConfirmationModal = () => {
    setSelectedTaskId(null);
    setShowDeleteConfirmationModal(false);
  };

  const handleDeleteTask = (id: number) => {
    handleOpenDeleteConfirmationModal(id);
  };

  const confirmDeleteTask = async () => {
    if (selectedTaskId) {
      try {
        await axios.delete(
          `http://localhost:5087/api/AssignTask/delete-asset-by-id/${selectedTaskId}`
        );
        const updatedTask = task.filter((t) => t.id !== selectedTaskId);
        setTask(updatedTask);
        handleCloseDeleteConfirmationModal();
      } catch (error) {
        alert(error);
      }
    }
  };

  const handleEditTask = (id: number) => {
    const selectedTask = task.find((t) => t.id === id);
    if (selectedTask) {
      setEditedTaskType(selectedTask.taskType);
      setSelectedTaskId(id);
      setShowEditModal(true);
    }
  };
  
  
  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setEditedTaskType("");
    setSelectedTaskId(null);
  };
  

  const handleUpdateTask = async () => {
    try {
      await axios.put(
        `http://localhost:5087/api/AssignTask/TaskType/${selectedTaskId}`,
        {
          taskType: editedTaskType,
        }
      );
      const updatedTask = task.map((t) =>
        t.id === selectedTaskId ? { ...t, taskType: editedTaskType } : t
      );
      setTask(updatedTask);
      handleCloseEditModal();
    } catch (error) {
      alert(error);
    }
  };
  
  

  return (
    <div style={{ margin: "4rem" }}>
      <Button
        variant="primary"
        style={{
          marginTop: "-40px",
          marginLeft: "600px",
          position: "relative",
          marginBottom: "20px",
        }}
        className="hover-change-color"
        onClick={() => setShowModal(true)}
      >
        Add Task
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
              <th>
                <input
                  type="checkbox"
                  style={{ boxShadow: "0 2px 4px rgba(128, 128, 128, 0.5)" }}
                />
              </th>
              <th>Task type</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {task && task.length > 0 ? (
              task.map((t) => {
                return (
                  <tr key={t.id} style={{ textAlign: "center" }}>
                    <td>
                      <input
                        type="checkbox"
                        style={{
                          boxShadow: "0 2px 4px rgba(128, 128, 128, 0.5)",
                        }}
                      />
                    </td>
                    <td>{t.taskType}</td>
                    <td>
                      <FaTrashAlt
                        style={{ color: "#ff615a" }}
                        onClick={() => handleOpenDeleteConfirmationModal(t.id)}
                      />
                      <FaPen style={{ color: "#482890", marginLeft: "10px" }}
                       onClick={() => handleEditTask(t.id)}
                       />
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={5}>No data available</td>
              </tr>
            )}
          </tbody>
        </Table>
      </div>

      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Add Task</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="taskType">
              <Form.Label>Task type</Form.Label>
              <Form.Control
  type="text"
  value={taskTypeInput}
  onChange={handleTaskTypeInputChange}
/>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddTask}>
            Add
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={showSuccessModal} onHide={handleCloseSuccessModal}>
        <Modal.Header closeButton>
          <Modal.Title>Success</Modal.Title>
        </Modal.Header>
        <Modal.Body>Task added successfully!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSuccessModal}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>

      {showAlert && (
        <div className="alert alert-danger" role="alert">
          Task type already exists!
        </div>
      )}

      <Modal
        show={showDeleteConfirmationModal}
        onHide={handleCloseDeleteConfirmationModal}
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirmation</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this task?</Modal.Body>
        <Modal.Footer>
          <Button
            variant="secondary"
            onClick={handleCloseDeleteConfirmationModal}
          >
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDeleteTask}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal
  show={showEditModal}
  onHide={handleCloseEditModal}
>
  <Modal.Header closeButton>
    <Modal.Title>Edit Task</Modal.Title>
  </Modal.Header>
  <Modal.Body>
    <Form>
      <Form.Group controlId="editedTaskType">
        <Form.Label>Task type</Form.Label>
        <Form.Control
          type="text"
          value={editedTaskType}
          onChange={(e) => setEditedTaskType(e.target.value)}
        />
      </Form.Group>
    </Form>
  </Modal.Body>
  <Modal.Footer>
    <Button variant="secondary" onClick={handleCloseEditModal}>
      Close
    </Button>
    <Button variant="primary" onClick={handleUpdateTask}>
      Update
    </Button>
  </Modal.Footer>
</Modal>


   
    </div>
  );
}

export default TaskTable;
