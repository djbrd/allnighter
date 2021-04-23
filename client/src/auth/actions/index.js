import axios from "axios";

import { loadScript } from "../../utils";

import { SIGNED_IN, SIGNED_OUT } from "./types";

export const authInit = () => async (dispatch) => {
  dispatch(googleAuthInit());
  dispatch(facebookAuthInit());
};

const registerToken = (token) => {
  localStorage.setItem("token", token);
  return {
    type: SIGNED_IN,
    payload: { jwtToken: token },
  };
};

export const signup = (token) => registerToken(token);

export const signin = (token) => registerToken(token);

export const signout = () => async (dispatch, getState) => {
  localStorage.removeItem("token");
  const { google, facebook } = getState().auth;
  if (google) {
    const res = await window.gapi.auth2.getAuthInstance().signOut();
  } else if (facebook) {
    await new Promise(window.FB.logout);
    dispatch({ type: SIGNED_OUT, payload: "facebook" });
  } else {
    await new Promise((r) => setTimeout(r, 1000));
    dispatch({ type: SIGNED_OUT });
  }
};

export const googleAuthInit = () => async (dispatch) => {
  await loadScript("https://apis.google.com/js/api.js");

  // Used on initialisation and to listen to any changes
  const onGoogleAuthChange = () => {
    const authClient = window.gapi.auth2.getAuthInstance();
    if (authClient.isSignedIn.get()) {
      dispatch(googleSignedIn(authClient.currentUser.get().getAuthResponse()));
    } else {
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
        (err) => console.log("Failed to init auth2: ", err)
      );
  });
};

// Get a token from the server
export const googleSignedIn = ({ id_token }) => async (dispatch) => {
  const res = await axios.post(`${process.env.REACT_APP_API_URL}/auth/google`, {
    tokenId: id_token,
  });
  const { token } = res.data;
  dispatch({ type: SIGNED_IN, payload: { jwtToken: token, google: true } });
};

// Retrieval of token from server is handled by callback at window level
export const googleSignIn = () => async (dispatch) => {
  // Todo: add submitting
  await window.gapi.auth2.getAuthInstance().signIn();
  // Todo: catch error
};

export const facebookAuthInit = () => async (dispatch) => {
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
export const facebookSignedIn = ({ accessToken }) => async (dispatch) => {
  const res = await axios.post(
    `${process.env.REACT_APP_API_URL}/auth/facebook`,
    {
      access_token: accessToken,
    }
  );
  const { token } = res.data;
  dispatch({ type: SIGNED_IN, payload: { jwtToken: token, facebook: true } });
};

export const facebookSignIn = () => async (dispatch) => {
  const { authResponse } = await new Promise(window.FB.login);
  if (authResponse) {
    dispatch(facebookSignedIn(authResponse));
  }

  // Todo: handle error
};
