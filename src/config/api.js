import axios from "axios";

const API = axios.create({
  baseURL: "http://127.0.0.1:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

API.interceptors.request.use(
  (config) => {
    const authData = JSON.parse(localStorage.getItem("auth"));

    if (authData?.token) {
      config.headers["Authorization"] = `Bearer ${authData?.token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default API;
