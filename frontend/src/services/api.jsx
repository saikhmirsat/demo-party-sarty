import axios from "axios";

const instance = axios.create({
  baseURL: "https://demo-party-sarty.onrender.com/api", // ⚠️ Change to production URL when deployed
});

export default instance;
