import axios from "axios";
import { Supplier } from "../types";

const BASE_URL = "http://localhost:5087/api/Suppliers";

export const fetchSuppliers = async (): Promise<Supplier[]> => {
  try {
    const response = await axios.get(BASE_URL);
    const data = response.data;
    const suppliers = data.map((supplier: any) => ({
      id: supplier.id,
      name: supplier.name,
      address: supplier.address,
      contactNumber: supplier.contactNumber,
      email: supplier.email,
      notes: supplier.notes,
    }));
    return suppliers;
  } catch (error) {
    console.error("Error getting suppliers:", error);
    throw error;
  }
};

export const addSupplier = async (supplier: Supplier): Promise<void> => {
  try {
    await axios.post(BASE_URL, supplier);
  } catch (error) {
    console.error("Error adding supplier:", error);
    throw error;
  }
};

export const editSupplier = async (supplier: Supplier): Promise<void> => {
  try {
    await axios.put(`${BASE_URL}/${supplier.id}`, supplier);
  } catch (error) {
    console.error("Error editing supplier:", error);
    throw error;
  }
};

export const deleteSupplier = async (supplier: Supplier): Promise<void> => {
  try {
    await axios.delete(`${BASE_URL}/${supplier.id}`);
  } catch (error) {
    console.error("Error deleting supplier:", error);
    throw error;
  }
};
