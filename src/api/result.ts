import axios from "axios";

export const apiClient = axios.create({
  baseURL: "http://localhost:5000",
  responseType: "json",
  headers: {
    "content-type": "multipart/form-data",
  },
});

export const test = async (param: FormData) => {
  const res = await apiClient.post(`/`, {
    params: param,
  });

  return res;
};

export const detection = async (param: FormData) => {
  const res = await apiClient.get(`/detection`, {
    params: param,
  });

  return res;
};
