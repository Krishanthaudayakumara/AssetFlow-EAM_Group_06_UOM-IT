import axios from "axios";
import { User } from "../types";

const API_URL = "http://localhost:5087/api/auth";

const getToken = (): string | null => localStorage.getItem("token");

const config = () => ({
  headers: { Authorization: `Bearer ${getToken()}` },
});

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_URL}/users`, config());
  return response.data;
};

export const getDeletedUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_URL}/users/deleted`, config());
  return response.data;
};

export const addUser = async (user: User): Promise<User> => {
  const response = await axios.post<User>(`${API_URL}/register`, user, config());
  return response.data;
};

export const editUser = async (user: User): Promise<void> => {
  await axios.put(`${API_URL}/users/${user.id}`, user, config());
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${API_URL}/users/${userId}`, config());
};

export const restoreDeletedUser = async (userId: string): Promise<void> => {
  await axios.post(`${API_URL}/users/deleted/${userId}/restore`, null, config());
};

export const deleteDeletedUser = async (userId: string): Promise<void> => {
  await axios.delete(`${API_URL}/users/deleted/${userId}`, config());
};

export const getAccessLog = async (userId: string | undefined) => {
  try {
    const response = await axios.get(`${API_URL}/users/${userId}/access-log`);
    return response.data;
  } catch (error) {
    console.error("Error fetching access log:", error);
    return [];
  }
};

export const getUserProfile = async (username: any, token:string) => {
  const response = await axios.get(`${API_URL}/users/${username}`, {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ${token}`,
    },
  });
  return response.data;
};

