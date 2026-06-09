import axiosInstance from "./axiosConfig";
import { API } from "../utils/constants";

export const getAllProducts = async (params?: Record<string, string | number | boolean>) => {
  const res = await axiosInstance.get(`${API}/products`, { params });
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
