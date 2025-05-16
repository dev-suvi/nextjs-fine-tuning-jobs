import axios from "axios";

const API_BASE_URL = "https://fe-test-api-production.up.railway.app/api/";
const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "x-api-key": API_KEY,
    "Content-Type": "application/json",
  },
});

export default apiClient;
