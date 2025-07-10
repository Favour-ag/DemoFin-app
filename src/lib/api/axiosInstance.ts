import axios from "axios";

// Optional: Set your base URL here
const baseURL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://spendin-admin-api.onrender.com/api";

// Create an Axios instance
const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});
export default api;
