import axios from "axios";

export const API_URL = "http://localhost:3003/api/v1";

const $api = axios.create({
  // kad prie kiekvienos užklausos automatiškai
  // prisikabintų slapukai
  withCredentials: true,
  baseURL: API_URL,
});

// prie kiekvienos uzklausos pridedamas tokenas
$api.interceptors.request.use((config) => {
  // localStorage saugomas accesToken jei juzeris prisijunges
  config.headers.Authorization = `Bearer ${localStorage.getItem("resToken")}`;

  return config;
});

export default $api;
