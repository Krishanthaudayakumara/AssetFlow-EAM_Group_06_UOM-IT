// departmentApi.ts

import axios, { AxiosError } from "axios";

interface Department {
  id: number;
  name: string;
  description: string;
}

const fetchDepartments = (): Promise<Department[]> => {
  return axios
    .get<Department[]>("https://assetflow.azurewebsites.net/api/Departments")
    .then((res) => {
      const data = res.data;
      const departments = data.map((department) => ({
        id: department.id,
        name: department.name,
        description: department.description,
      }));
      return departments;
    })
    .catch((error: AxiosError) => {
      console.error(error);
      return [];
    });
};

const addDepartment = (department: Department): Promise<void> => {
  return axios
    .post("https://assetflow.azurewebsites.net/api/Departments", department)
    .then(() => {
      // Do nothing, as the departments will be refetched separately
    })
    .catch((error: AxiosError) => {
      console.error(error);
      throw error;
    });
};

const editDepartment = (department: Department, fetchDepartments: () => void): Promise<void> => {
  return axios
    .put(`https://assetflow.azurewebsites.net/api/Departments/${department.id}`, department)
    .then(() => {
      // Do nothing, as the departments will be refetched separately
    })
    .catch((error: AxiosError) => {
      console.error(error);
      throw error;
    });
};

const deleteDepartment = (department: Department, fetchDepartments: () => void): Promise<void> => {
  if (window.confirm("Are you sure you want to delete this department?")) {
    return axios
      .delete(`https://assetflow.azurewebsites.net/api/Departments/${department.id}`)
      .then(() => {
        // Do nothing, as the departments will be refetched separately
      })
      .catch((error: AxiosError) => {
        console.error(error);
        throw error;
      });
  } else {
    return Promise.resolve(); // Return a resolved promise if deletion is canceled
  }
};

export { fetchDepartments, addDepartment, editDepartment, deleteDepartment };
