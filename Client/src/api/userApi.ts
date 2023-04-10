import axios from "axios";
import { User } from "../types";

const API_URL = "http://localhost:5087/api/auth";

export const getUsers = async (): Promise<User[]> => {
  const response = await axios.get<User[]>(`${API_URL}/users`);
  return response.data;
};

export const addUser = async (user: User): Promise<User> => {
  const response = await axios.post<User>(`${API_URL}/register`, user);
  return response.data;
};

export const editUser = async (user: User): Promise<void> => {
  await axios.put(`${API_URL}/users/${user.id}`, user);
};

export const deleteUser = async (userId: string): Promise<void> => {
  await axios.delete(`${API_URL}/users/${userId}`);
};
