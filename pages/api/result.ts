import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  responseType: "json",
  headers: {
    "Content-type": "application/json",
  },
});

export const test = async () => {
  const response = await apiClient.get("/api/hello");

  return response;
};
