import React, { useState, useEffect, ChangeEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Form } from "react-bootstrap";
import axios from "axios";

interface TaskTypeData {
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
  const [taskId, setTaskId] = useState<TaskTypeData[]>([]);
  const [selectedTaskId, setSelectedTaskId] = useState<number>(0);
  const [buildingNames, setBuildingNames] = useState<BuildingData[]>([]);
  const [selectedBuildingName, setSelectedBuildingName] = useState("");
  const [externalEmployees, setExternalEmployees] = useState<CleaningStaff[]>([]);
  const [selectedExternalEmployee, setSelectedExternalEmployee] = useState("");
  const [assignedDate, setAssignedDate] = useState<string>("");
  const [status, setStatus] = useState<string>("");

  useEffect(() => {
    const fetchTaskType = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/AssignTask");
        const data = response.data;
        console.log(response.data);
        setTaskId(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchTaskType();
  }, []);

  useEffect(() => {
    const fetchBuildingNames = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/Building");
        const data = response.data;
        console.log(response.data);
        setBuildingNames(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchBuildingNames();
  }, []);

  useEffect(() => {
    const fetchExternalEmployees = async () => {
      try {
        const response = await axios.get("http://localhost:5087/api/ExternalWorker");
        const data = response.data;
        console.log(response.data);
        setExternalEmployees(data);
      } catch (error) {
        alert(error);
      }
    };

    fetchExternalEmployees();
  }, []);

  const handleTaskIdChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedTaskId = event.target.value;
//setSelectedTaskId(selectedTaskId);
  };

  const handleBuildingNameChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedBuildingName = event.target.value;
    setSelectedBuildingName(selectedBuildingName);
  };

  const handleExternalEmployeeChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedExternalEmployee = event.target.value;
    setSelectedExternalEmployee(selectedExternalEmployee);
  };

  const handleAssignedDateChange = (event: ChangeEvent<HTMLInputElement>) => {
    const date = event.target.value;
    setAssignedDate(date);
  };

  const handleStatusChange = (event: ChangeEvent<HTMLSelectElement>) => {
    const selectedStatus = event.target.value;
    setStatus(selectedStatus);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
  
    const data = {
      taskId: selectedTaskId,
      buildingName: selectedBuildingName,
      assignedTo: selectedExternalEmployee,
      assignedDate: assignedDate,
      status: status,
    };
  
    try {
      const response = await axios.put(`http://localhost:5087/api/AssignTask/${selectedTaskId}`, data);
      if (response.status === 200) {
        alert("Task updated successfully!");
      } else {
        alert("An error occurred while updating the task.");
      }
    } catch (error) {
      alert(error);
    }
  };
  

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Group controlId="task">
        <Form.Label>Task:</Form.Label>
        <Form.Select onChange={handleTaskIdChange}>
          <option value="">-- Please Select Task --</option>
          {taskId.map((task) => (
            <option key={task.id} value={task.id}>
              {task.id}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="buildingName">
        <Form.Label>Building Name:</Form.Label>
        <Form.Select value={selectedBuildingName} onChange={handleBuildingNameChange}>
          <option value="">-- Please Select Building Name --</option>
          {buildingNames.map((building) => (
            <option key={building.id} value={building.buildingName}>
              {building.buildingName}
            </option>
          ))}
        </Form.Select>
      </Form.Group>

      <Form.Group controlId="assignedTo">
        <Form.Label>Assigned to:</Form.Label>
        <Form.Select value={selectedExternalEmployee} onChange={handleExternalEmployeeChange}>
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
        <Form.Select value={status} onChange={handleStatusChange}>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
        </Form.Select>
      </Form.Group>
      
      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default AddTaskForm;
