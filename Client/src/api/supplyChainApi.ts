// api.ts
import axios from 'axios';

const API_URL = 'http://localhost:5087/api/SupplyChain';

export const createSupplyChain = async (supplyChainData: any) => {
  try {
    const response = await axios.post(API_URL, supplyChainData);
    return response.data;
  } catch (error) {
    console.error('Error creating supply chain:', error);
    throw error;
  }
};

export const getAllSupplyChains = async () => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error('Error getting supply chains:', error);
    throw error;
  }
};

export const getSupplyChainById = async (id: number) => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error getting supply chain with ID ${id}:`, error);
    throw error;
  }
};

export const editSupplyChain = async (id: number, supplyChainData: any) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, supplyChainData);
    return response.data;
  } catch (error) {
    console.error(`Error editing supply chain with ID ${id}:`, error);
    throw error;
  }
};

export const deleteSupplyChain = async (id: number) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting supply chain with ID ${id}:`, error);
    throw error;
  }
};

export const activateSupplyChain = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/activate`);
    return response.data;
  } catch (error) {
    console.error(`Error activating supply chain with ID ${id}:`, error);
    throw error;
  }
};

export const deactivateSupplyChain = async (id: number) => {
  try {
    const response = await axios.put(`${API_URL}/${id}/deactivate`);
    return response.data;
  } catch (error) {
    console.error(`Error deactivating supply chain with ID ${id}:`, error);
    throw error;
  }
};
