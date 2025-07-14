import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://youtube-main.onrender.com",
});

export default axiosInstance;
