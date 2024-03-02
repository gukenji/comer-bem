import axios from "axios";
// Create an Axios instance with default options

const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: false,
});

axiosInstance.interceptors.request.use(
  (req) => {
    const authTokens = localStorage.getItem("tokenInfo")
      ? JSON.parse(localStorage.getItem("tokenInfo") || "")
      : null;

    if (authTokens) {
      req.headers.Authorization = `Bearer ${authTokens?.access}`;
    }
    return req;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
