import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  responseType: "json",
  headers: {
    "content-type": "multipart/form-data",
  },
});

export const detection = async (param: FormData) => {
  const response = await apiClient.get(`/api/detection/${param}`);

  return response;
};
