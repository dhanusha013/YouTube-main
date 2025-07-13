import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://yourtube-hspf.onrender.com",
});

export default axiosInstance;
