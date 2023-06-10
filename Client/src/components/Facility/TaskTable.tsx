import React, { useState, useEffect } from 'react';
import { Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';
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

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleAddTask = async () => {
    // Check if the task type already exists in the list
    const taskExists = task.some(t => t.taskType === taskTypeInput);
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
    } catch (error) {
      alert(error);
    }
  };

  const handleTaskTypeInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

      <div className="shadow p-2 mb- bg-white rounded" style={{ width: "800px" }}>
        <Table className="table w-100 small text-center" hover align="center" style={{ fontSize: "14px", width: "500px" }}>
          <thead>
            <tr style={{ color: "#482890" }}>
              <th><input type="checkbox" style={{ boxShadow: "0 2px 4px rgba(128, 128, 128, 0.5)" }} /></th>
              <th>Task type</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {task && task.length > 0 ? (
              task.map((t) => {
                return (
                  <tr key={t.id} style={{ textAlign: "center" }}>
                    <td>
                      <input type="checkbox" style={{ boxShadow: "0 2px 4px rgba(128, 128, 128, 0.5)" }} />
                    </td>
                    <td>{t.taskType}</td>
                    <td>
                      <FaTrashAlt style={{ color: "#ff615a" }} />
                      <FaPen style={{ color: "#482890", marginLeft: "10px" }} />
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
              <Form.Control type="text" value={taskTypeInput} onChange={handleTaskTypeInputChange} />
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
        <Modal.Body>
          Task added successfully!
        </Modal.Body>
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
    </div>
  );
}

export default TaskTable;
