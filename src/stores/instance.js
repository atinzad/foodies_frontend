import axios from "axios";

const instance = axios.create({
  // baseURL: "http://localhost:8000/api",
  baseURL: "http://192.168.100.22:8000/api",
});

export default instance;
