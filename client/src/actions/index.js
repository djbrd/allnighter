import { AUTH_USER } from "./types";

const registerToken = (token) => {
  localStorage.setItem("token", token);
  return {
    type: AUTH_USER,
    payload: token,
  };
};

export const signup = (token) => registerToken(token);

export const signin = (token) => registerToken(token);

export const signout = () => {
  localStorage.removeItem("token");
  return {
    type: AUTH_USER,
    payload: "",
  };
};
