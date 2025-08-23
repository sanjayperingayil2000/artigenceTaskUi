import axios from "axios";

const instance = axios.create({
  baseURL: "http://artigence-task-backend.vercel.app/api", // http://localhost:5000/api change to your deployed backend URL
  // baseURL: "http://localhost:5000/api", 
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
