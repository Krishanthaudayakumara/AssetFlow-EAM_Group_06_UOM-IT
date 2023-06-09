import axios from "axios";

export const login = async (username: string, password: string) => {
  try {
    const response = await axios.post("http://localhost:5087/api/auth/login", {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error("Invalid username or password");
  }
};
