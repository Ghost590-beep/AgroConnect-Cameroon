import axios from "axios";
import { API } from "../utils/constants";

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getProfile = async (token: string) => {
  const res = await axios.get(`${API}/user/profile`, authHeader(token));
  return res.data;
};

export const getUserStats = async (token: string) => {
  const res = await axios.get(`${API}/user/stats`, authHeader(token));
  return res.data;
};

export const getUserProducts = async (token: string) => {
  const res = await axios.get(`${API}/user/products`, authHeader(token));
  return res.data;
};

export const getUserOrders = async (token: string) => {
  const res = await axios.get(`${API}/user/orders`, authHeader(token));
  return res.data;
};

export const updateProfile = async (
  token: string,
  form: { full_name: string; phone: string; location: string }
) => {
  const res = await axios.put(`${API}/user/profile`, form, authHeader(token));
  return res.data;
};

export const uploadAvatar = async (token: string, file: File) => {
  const formData = new FormData();
  formData.append("profile_image", file);
  const res = await axios.put(`${API}/user/profile/avatar`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "multipart/form-data",
    },
  });
  return res.data;
};

export const changePassword = async (
  token: string,
  payload: { current_password: string; new_password: string }
) => {
  const res = await axios.put(`${API}/user/change-password`, payload, authHeader(token));
  return res.data;
};

export const saveNotifications = async (
  token: string,
  payload: {
    orders: boolean;
    promotions: boolean;
    newsletter: boolean;
    sms: boolean;
  }
) => {
  const res = await axios.put(`${API}/user/notifications`, payload, authHeader(token));
  return res.data;
};

export const deleteAccount = async (token: string) => {
  const res = await axios.delete(`${API}/user/account`, authHeader(token));
  return res.data;
};