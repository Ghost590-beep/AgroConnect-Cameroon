import axiosInstance from "./axiosConfig";
import { API } from "../utils/constants";

export const getAllProducts = async () => {
  const res = await axiosInstance.get(`${API}/products`);
  // API responses are wrapped as { success, message, data }
  // return the inner payload so callers receive the actual products array
  return res.data.data;
};

export const getProductById = async (id: number) => {
  const res = await axiosInstance.get(`${API}/products/${id}`);
  return res.data.data;
};

export const uploadProduct = async (token: string, formData: FormData) => {
  const res = await axiosInstance.post(`${API}/products`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const deleteProduct = async (token: string, id: number) => {
  const res = await axiosInstance.delete(`${API}/products/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};