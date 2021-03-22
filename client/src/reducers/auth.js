import { AUTH_USER } from "../actions/types";

const INITIAL_STATE = {
  authenticated: "",
  errorMessage: "",
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case AUTH_USER:
      return {
        ...state,
        authenticated: action.payload,
      };
    default:
      return state;
  }
};

export default auth;
