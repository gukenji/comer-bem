import axios from "axios";
// Create an Axios instance with default options
let authTokens = localStorage.getItem("tokenInfo")
  ? JSON.parse(localStorage.getItem("tokenInfo") || "")
  : null;

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: false,
  headers: { Authorization: `Beearer ${authTokens?.access}` },
});

axiosInstance.interceptors.request.use(async (req) => {
  if (!authTokens) {
    authTokens = localStorage.getItem("tokenInfo")
      ? JSON.parse(localStorage.getItem("tokenInfo") || "")
      : null;
    req.headers.Authorization = `Beearer ${authTokens?.access}`;
  }
  return req;
});

export default axiosInstance;
