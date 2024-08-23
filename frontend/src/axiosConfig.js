// src/axiosConfig.js
import axios from "axios";

const api = axios.create({
  baseURL: "https://unani-med-search.vercel.app",
});

export default api;
