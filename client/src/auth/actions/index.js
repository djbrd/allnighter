import { api } from "../../utils/api";

import { loadScript } from "../../utils";

import {
  INITIALISING_AUTH,
  SIGNED_IN,
  SIGNED_OUT,
  SIGNING_IN,
  SIGNING_IN_ERROR,
  SIGNING_OUT,
} from "./types";

import { loadState, saveState, clearState } from "../../utils";

export const authInit = () => async (dispatch) => {
  const user = loadState("user");
  if (user) {
    dispatch(registerUser(user));
  }
  dispatch(googleAuthInit());
  dispatch(facebookAuthInit());
};

export const signing = () => {
  return {
    type: SIGNING_IN,
  };
};

export const signingError = (errorMessage) => {
  return {
    type: SIGNING_IN_ERROR,
    payload: { errorMessage },
  };
};

const registerUser = (user) => {
  const { token, userName, admin } = user;
  saveState("user", user);
  return {
    type: SIGNED_IN,
    payload: { token, userName, admin },
  };
};

export const signup = (user) => registerUser(user);

export const signin = (user) => registerUser(user);

export const signout = () => async (dispatch, getState) => {
  clearState("user");
  dispatch({ type: SIGNING_OUT });
  const { google, facebook } = getState().auth;
  if (google) {
    await window.gapi.auth2.getAuthInstance().signOut();
  } else if (facebook) {
    await new Promise(window.FB.logout);
    dispatch({ type: SIGNED_OUT, payload: "facebook" });
  } else {
    await new Promise((r) => setTimeout(r, 1000));
    dispatch({ type: SIGNED_OUT });
  }
};

export const googleAuthInit = () => async (dispatch) => {
  dispatch({ type: INITIALISING_AUTH, payload: "google" });
  await loadScript("https://apis.google.com/js/api.js");

  // Used on initialisation and to listen to any changes
  const onGoogleAuthChange = () => {
    const authClient = window.gapi.auth2.getAuthInstance();
    if (authClient.isSignedIn.get()) {
      dispatch(googleSignedIn(authClient.currentUser.get().getAuthResponse()));
    } else {
      console.log("Signed out of google");
      dispatch({ type: SIGNED_OUT, payload: "google" });
    }
  };

  window.gapi.load("auth2", () => {
    window.gapi.auth2
      .init({
        clientId: process.env.REACT_APP_GOOGLE_CLIENT_ID,
        scope: "email",
      })
      .then(
        () => {
          onGoogleAuthChange();
          window.gapi.auth2
            .getAuthInstance()
            .isSignedIn.listen(onGoogleAuthChange);
        },
        (err) => {
          console.log("Failed to init auth2: ", err);
          dispatch({ type: SIGNED_OUT, payload: "google" });
        }
      )
      .catch((err) => {
        console.log("Could not init google auth2: ", err);
        dispatch({ type: SIGNED_OUT, payload: "google" });
      });
  });
};

// Get a token from the server
export const googleSignedIn =
  ({ id_token }) =>
  async (dispatch) => {
    const res = await api.post("/auth/google", {
      tokenId: id_token,
    });
    const { token, userName, admin } = res.data;
    dispatch({
      type: SIGNED_IN,
      payload: { token, userName, admin, google: true },
    });
  };

// Retrieval of token from server is handled by callback at window level
export const googleSignIn = () => async (dispatch) => {
  dispatch(signing());
  try {
    await window.gapi.auth2.getAuthInstance().signIn();
  } catch (err) {
    dispatch(signingError(err.error));
  }
};

export const facebookAuthInit = () => async (dispatch) => {
  dispatch({ type: INITIALISING_AUTH, payload: "facebook" });

  // Add async callback used by Facebook to window
  window.fbAsyncInit = () => {
    window.FB.init({
      appId: process.env.REACT_APP_FACEBOOK_APP_ID,
      cookie: true,
      xfbml: true,
      version: "v10.0",
    });

    window.FB.getLoginStatus((response) => {
      if (response.status === "connected") {
        dispatch(facebookSignedIn(response.authResponse));
      } else {
        dispatch({ type: SIGNED_OUT, payload: "facebook" });
      }
    });
  };

  loadScript("https://connect.facebook.net/en_US/sdk.js");
};

// Use access token to retrieve a jwt token from api
export const facebookSignedIn =
  ({ accessToken }) =>
  async (dispatch) => {
    const res = await api.post("/auth/facebook", {
      access_token: accessToken,
    });
    const { token, userName, admin } = res.data;
    dispatch({
      type: SIGNED_IN,
      payload: { token, userName, admin, facebook: true },
    });
  };

export const facebookSignIn = () => async (dispatch) => {
  dispatch(signing());
  try {
    const { authResponse } = await new Promise(window.FB.login);
    if (authResponse) {
      dispatch(facebookSignedIn(authResponse));
    }
  } catch (err) {
    dispatch(signingError(err));
  }
};
