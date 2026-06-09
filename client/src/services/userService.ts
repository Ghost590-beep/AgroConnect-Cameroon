import axiosInstance from "./axiosConfig";
import { API } from "../utils/constants";

const authHeader = (token: string) => ({
  headers: { Authorization: `Bearer ${token}` },
});

export const getProfile = async (token: string) => {
  const res = await axiosInstance.get(`${API}/user/profile`, authHeader(token));
  return res.data.data;
};

export const getUserStats = async (token: string) => {
  const res = await axiosInstance.get(`${API}/user/stats`, authHeader(token));
  return res.data.data;
};

export const getUserProducts = async (token: string) => {
  const res = await axiosInstance.get(
    `${API}/user/products`,
    authHeader(token),
  );
  return res.data.data;
};

export const getUserOrders = async (token: string) => {
  const res = await axiosInstance.get(`${API}/user/orders`, authHeader(token));
  return res.data.data;
};

export const updateProfile = async (
  token: string,
  form: { full_name: string; phone: string; location: string },
) => {
  const res = await axiosInstance.put(
    `${API}/user/profile`,
    form,
    authHeader(token),
  );
  return res.data.data;
};

export const uploadAvatar = async (token: string, file: File) => {
  const formData = new FormData();
  formData.append("profile_image", file);
  const res = await axiosInstance.put(`${API}/user/profile/avatar`, formData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data.data;
};

export const changePassword = async (
  token: string,
  payload: { current_password: string; new_password: string },
) => {
  const res = await axiosInstance.post(
    `${API}/user/change-password`,
    payload,
    authHeader(token),
  );
  return res.data.data;
};

export const saveNotifications = async (
  token: string,
  payload: {
    orders: boolean;
    promotions: boolean;
    newsletter: boolean;
    sms: boolean;
  },
) => {
  const res = await axiosInstance.post(
    `${API}/user/notifications`,
    payload,
    authHeader(token),
  );
  return res.data.data;
};

export const deleteAccount = async (token: string) => {
  const res = await axiosInstance.delete(
    `${API}/user/account`,
    authHeader(token),
  );
  return res.data.data;
};
