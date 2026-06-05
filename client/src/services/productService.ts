import axios from "axios";
import { API } from "../utils/constants";

export const getAllProducts = async () => {
  const res = await axios.get(`${API}/products`);
  return res.data;
};

export const getProductById = async (id: number) => {
  const res = await axios.get(`${API}/products/${id}`);
  return res.data;
};

export const uploadProduct = async (token: string, formData: FormData) => {
  const res = await axios.post(`${API}/products`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const deleteProduct = async (token: string, id: number) => {
  const res = await axios.delete(`${API}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};