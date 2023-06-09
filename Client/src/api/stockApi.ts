import axios from 'axios';

const baseUrl = 'http://localhost:5087/api/Stock';

export const getStock = () => {
  return axios.get(baseUrl);
};

export const createStock = (formData: any) => {
  return axios.post(baseUrl, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const getStockById = (stockId: any) => {
  return axios.get(`${baseUrl}/${stockId}`);
};

export const getStockBarcodes = (stockId: number) => {
  return axios.get(`${baseUrl}/${stockId}/barcode`);
};


export const updateStock = (stockId: any, formData: any) => {
  return axios.put(`${baseUrl}/${stockId}`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
};

export const deleteStock = (stockId: any) => {
  return axios.delete(`${baseUrl}/${stockId}`);
};
