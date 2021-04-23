import { SIGNED_IN, SIGNED_OUT } from "../actions/types";

const INITIAL_STATE = {
  jwtToken: null,
  errorMessage: "",
  google: null,
  facebook: null,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SIGNED_IN:
      return {
        ...state,
        errorMessage: "",
        ...action.payload,
      };
    case SIGNED_OUT:
      let nextState = {
        ...state,
      };

      if (action.payload) {
        nextState[action.payload] = false;
      }

      // Signed out after being signed in - clear jwt token
      if (!action.payload || state[action.payload]) {
        nextState.errorMessage = "";
        nextState.jwtToken = false;
      }

      // Initialise jwtToken if all auth providers have been checked
      // Only necessary if null value of jwtToken is being used to indicate initialisation
      else if (nextState.google === false && nextState.facebook === false) {
        nextState.jwtToken = false;
      }

      return nextState;
    default:
      return state;
  }
};

export default auth;
