// src/api/axiosInstance.js
import axios from "axios";

const axiosInstance = axios.create({
	baseURL: "http://localhost:3000/", // Adjust based on your backend URL
	withCredentials: true, // Required for sending cookies with requests
});

export default axiosInstance;
