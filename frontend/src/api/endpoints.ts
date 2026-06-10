import { apiPost } from "../api/axios";

export const login = async (formData: object) => {
  const res = await apiPost("auth/login", formData);
  return res.data;
};

export const register = async (formData: object) => {
  const res = await apiPost("auth/sign-up", formData);
  return res.data;
};
