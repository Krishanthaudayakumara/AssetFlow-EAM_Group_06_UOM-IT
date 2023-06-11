import axios, { AxiosError } from "axios";

interface Department {
  id: number;
  name: string;
  description: string;
}

const fetchDepartments = (): Promise<Department[]> => {
  return axios
    .get<Department[]>("http://localhost:5087/api/Departments")
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

const addDepartment = (department: Department, fetchDepartments: () => void): void => {
  axios
    .post("http://localhost:5087/api/Departments", department)
    .then(() => {
      fetchDepartments();
    })
    .catch((error: AxiosError) => console.error(error));
};

const editDepartment = (department: Department, fetchDepartments: () => void): void => {
  axios
    .put(`http://localhost:5087/api/Departments/${department.id}`, department)
    .then(() => {
      fetchDepartments();
    })
    .catch((error: AxiosError) => console.error(error));
};

const deleteDepartment = (department: Department, fetchDepartments: () => void): void => {
  if (window.confirm("Are you sure you want to delete this department?")) {
    axios
      .delete(`http://localhost:5087/api/Departments/${department.id}`)
      .then(() => {
        fetchDepartments();
      })
      .catch((error: AxiosError) => console.error(error));
  }
};

export { fetchDepartments, addDepartment, editDepartment, deleteDepartment };
