import axios from "axios";
import { API } from "../utils/constants";

export interface LoginPayload {
  email: string;
  password: string;
}

export interface RegisterPayload {
  full_name: string;
  email: string;
  phone: string;
  password: string;
  location?: string;
}

export interface AuthResponse {
  token: string;
  user: {
    id: number;
    full_name: string;
    email: string;
    phone: string;
    location: string;
    profile_image?: string;
  };
}

export const loginUser = async (payload: LoginPayload): Promise<AuthResponse> => {
  const res = await axios.post(`${API}/auth/login`, payload);
  return res.data;
};

export const registerUser = async (payload: RegisterPayload): Promise<AuthResponse> => {
  const res = await axios.post(`${API}/auth/register`, payload);
  return res.data;
};

export const logoutUser = (): void => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
};