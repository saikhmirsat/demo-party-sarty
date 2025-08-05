import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api", // ⚠️ Change to production URL when deployed
});

export default instance;
