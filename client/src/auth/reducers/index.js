import {
  INITIALISING_AUTH,
  SIGNED_IN,
  SIGNED_OUT,
  SIGNING_IN,
  SIGNING_IN_ERROR,
  SIGNING_OUT,
} from "../actions/types";

const INITIAL_STATE = {
  initialising: [],
  jwtToken: null,
  errorMessage: "",
  google: null,
  facebook: null,
  isAuthorising: false,
  isSigningOut: false,
};

const auth = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INITIALISING_AUTH:
      return {
        ...state,
        initialising: [...state.initialising, action.payload],
      };

    case SIGNED_IN:
      return {
        ...state,
        isAuthorising: false,
        errorMessage: "",
        ...action.payload,
        initialising: state.initialising.filter(
          (item) => !(item in action.payload)
        ),
      };

    case SIGNED_OUT:
      let nextState = {
        ...state,
        isSigningOut: false,
      };

      // Remove indication of being signed in with an oauth provider
      if (action.payload) {
        nextState[action.payload] = false;
        nextState.initialising = state.initialising.filter(
          (item) => item !== action.payload
        );
      }

      // Signed out after being signed in - clear jwt token
      if (!action.payload || state[action.payload]) {
        nextState.errorMessage = "";
        nextState.jwtToken = false;
      }

      // Initialise jwtToken if all auth providers have been checked
      // Only necessary if null value of jwtToken is being used to indicate initialisation
      // else if (nextState.google === false && nextState.facebook === false) {
      //   nextState.jwtToken = false;
      // }

      return nextState;

    case SIGNING_IN:
      return {
        ...state,
        isAuthorising: true,
        errorMessage: "",
      };

    case SIGNING_IN_ERROR:
      const { errorMessage } = action.payload;
      return {
        ...state,
        isAuthorising: false,
        errorMessage,
      };

    case SIGNING_OUT:
      return {
        ...state,
        isSigningOut: true,
      };

    default:
      return state;
  }
};

export default auth;
