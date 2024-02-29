import axios from "axios";
import jwt_decode from "jwt-decode";
// Create an Axios instance with default options
const axiosInstance = axios.create({
  baseURL: "http://localhost:8000/api",
  withCredentials: false,
});

export default axiosInstance;
