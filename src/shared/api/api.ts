import axios from "axios";
import { useUserStore } from "../stores";

const api = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.response.use(
  res => res,
  err => {
    if (err.response?.status === 401 || err.response?.status === 403) {
      useUserStore.getState().reset();
      window.location.href = "/";
    }
    return Promise.reject(err);
  }
);

export default api;
