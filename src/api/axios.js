import axios from "axios";

const instance = axios.create({
  baseURL: "https://artigence-task-backend.vercel.app/", // change to your deployed backend URL
  headers: {
    "Content-Type": "application/json"
  }
});

instance.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default instance;
