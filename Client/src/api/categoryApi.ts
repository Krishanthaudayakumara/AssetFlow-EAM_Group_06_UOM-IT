import axios from 'axios';

const BASE_URL = 'http://localhost:5087/api/Category';

export const getCategories = () => {
  return axios.get(BASE_URL);
};

export const addCategory = (category: { name: string; description: string; image: File }) => {
  const formData = new FormData();
  formData.append('Name', category.name);
  formData.append('Description', category.description);
  formData.append('Image', category.image);
  return axios.post(BASE_URL, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const editCategory = (category: { id: number; name: string; description: string; image: File }) => {
  const formData = new FormData();
  formData.append('Id', category.id.toString());
  formData.append('Name', category.name);
  formData.append('Description', category.description);
  formData.append('Image', category.image);
  return axios.put(`${BASE_URL}/${category.id}`, formData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteCategory = (id: number) => {
  return axios.delete(`${BASE_URL}/${id}`);
};

export const getCategory = (id: number) => {
    return axios.get(`${BASE_URL}/${id}`);
  };
