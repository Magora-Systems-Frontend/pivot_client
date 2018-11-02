import axios from "./axiosClient";

export function login(data) {
  return axios.post("/login", data);
}

export function resetPassword(data) {
  return axios.post("/passwords", data);
}

export function restorePassword(data) {
  return axios.patch("/passwords", data);
}
