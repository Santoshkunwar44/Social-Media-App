import axios from "axios";

const axiosCall = axios.create({
  baseURL: "http://localhost:8800/api",
});

export default axiosCall;
