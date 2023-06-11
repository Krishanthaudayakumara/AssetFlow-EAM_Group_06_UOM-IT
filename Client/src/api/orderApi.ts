import axios from 'axios';

const BASE_URL = 'http://localhost:5087/api/orders';

export const checkAndCreateOrder = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/check-and-create`);
      const { email } = response.data;
      return { email, order: response.data };
    } catch (error) {
      console.error('Error checking and creating order:', error);
      throw error;
    }
  };
  
export const getOrders = () => {
  return axios.get(BASE_URL);
};

export const getOrderById = (orderId: number) => {
  return axios.get(`${BASE_URL}/${orderId}`);
};

export const deleteOrder = (orderId: number) => {
  return axios.delete(`${BASE_URL}/${orderId}`);
};

export const approveOrder = (orderId: number) => {
  return axios.post(`${BASE_URL}/${orderId}/approve`);
};

export const completeOrder = (orderId: number) => {
  return axios.post(`${BASE_URL}/${orderId}/complete`);
};
