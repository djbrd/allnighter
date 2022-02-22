import axios from "axios";

let store;

export const injectStore = (_store) => {
  store = _store;
};

export const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
});

api.interceptors.request.use((config) => {
  config.headers.authorization = store.getState().auth.token;
  return config;
});
