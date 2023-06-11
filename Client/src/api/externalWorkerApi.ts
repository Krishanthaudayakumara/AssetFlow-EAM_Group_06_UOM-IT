import axios from 'axios';

const API_BASE_URL = 'http://localhost:5087/api/ExternalWorkers';

export const getExternalWorkers = (includeDeleted: boolean) => {
  return axios.get(`${API_BASE_URL}?includeDeleted=${includeDeleted}`, {
    headers: { 'Accept': 'text/plain' }
  });
};

export const addExternalWorker = (externalWorkerData: any) => {
  return axios.post(API_BASE_URL, externalWorkerData, {
    headers: { 'Accept': 'text/plain', 'Content-Type': 'application/json' }
  });
};

export const getExternalWorkerById = (id: any) => {
  return axios.get(`${API_BASE_URL}/${id}`, {
    headers: { 'Accept': 'text/plain' }
  });
};

export const editExternalWorker = (id: any, updatedData: any) => {
  return axios.put(`${API_BASE_URL}/${id}`, updatedData, {
    headers: { 'Accept': '*/*', 'Content-Type': 'application/json' }
  });
};

export const deleteExternalWorker = (id: any) => {
  return axios.delete(`${API_BASE_URL}/${id}`, {
    headers: { 'Accept': '*/*' }
  });
};

export const exportToExcel = (includeDeleted: Boolean) => {
  return axios.get(`${API_BASE_URL}/export?includeDeleted=${includeDeleted}`, {
    headers: { 'Accept': '*/*' }
  });
};

export const importFromExcel = (file: Blob) => {
  const formData = new FormData();
  formData.append('file', file, 'SampleExternalWorkers.xlsx');

  return axios.post(`${API_BASE_URL}/import`, formData, {
    headers: { 'Accept': '*/*', 'Content-Type': 'multipart/form-data' }
  });
};

export const getSampleExcelFile = () => {
  return axios.get(`${API_BASE_URL}/sample`, {
    headers: { 'Accept': '*/*' },
    responseType: 'arraybuffer'
  });
};
