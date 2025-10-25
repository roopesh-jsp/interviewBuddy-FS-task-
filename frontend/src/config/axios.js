import axios from "axios";

const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  // baseURL: "https://render.com/docs/troubleshooting-deploys",
});

export default apiClient;
