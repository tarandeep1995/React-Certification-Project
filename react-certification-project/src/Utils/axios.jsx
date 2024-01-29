import axios from "axios";

// Create an instance of Axios with a base URL
const API = axios.create({
  baseURL: "https://5fc1a1c9cb4d020016fe6b07.mockapi.io/api/v1",
});

export default API;
