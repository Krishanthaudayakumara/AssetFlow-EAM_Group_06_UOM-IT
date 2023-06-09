import axios from "axios";
import { Employee } from "../types";

const API_URL = "http://localhost:5087/api/Employee";

export const getEmployees = async (): Promise<Employee[]> => {
  try {
    const response = await axios.get<Employee[]>(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error fetching employees:", error);
    return [];
  }
};

export const addEmployee = async (employee: Employee): Promise<void> => {
  try {
    await axios.post(API_URL, employee);
  } catch (error) {
    console.error("Error adding employee:", error);
    throw error;
  }
};

export const updateEmployee = async (employee: Employee): Promise<void> => {
  try {
    await axios.put(`${API_URL}/${employee.id}`, employee);
  } catch (error) {
    console.error("Error updating employee:", error);
    throw error;
  }
};

export const deleteEmployee = async (employeeId: string): Promise<void> => {
  try {
    await axios.delete(`${API_URL}/${employeeId}`);
  } catch (error) {
    console.error("Error deleting employee:", error);
    throw error;
  }
};

export const uploadFile = async (file: File): Promise<void> => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    await axios.post(`${API_URL}/upload`, formData);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};
