import React from "react";
import useScript from "react-script-hook";
import { useDispatch, useSelector } from "react-redux";
import { googleAuthInit, googleSignIn } from "../../auth/actions";

const AuthHeader = () => {
  const dispatch = useDispatch();
  const googleSignedIn = useSelector((state) => state.auth.googleSignedIn);

  const [loading, error] = useScript({
    src: "https://apis.google.com/js/api.js",
    onload: () => {
      window.gapi.load("auth2", () => {
        window.gapi.auth2
          .init({
            clientId:
              "613329788394-a27qkojnfohbbdqundmutrvvumpbkr3a.apps.googleusercontent.com",
            scope: "email",
          })
          .then(
            () => {
              const authClient = window.gapi.auth2.getAuthInstance();
              dispatch(googleAuthInit(authClient));
              dispatch(googleSignIn(authClient.isSignedIn.get()));
              authClient.isSignedIn.listen(() => {
                console.log("Google auth changed");
                dispatch(googleSignIn(authClient.isSignedIn.get()));
              });
            },
            (err) => console.log("Failed to init auth2: ", err)
          );
      });
    },
  });

  if (loading) return <h3>Loading</h3>;

  if (error) return <h3>Failed to load google api</h3>;

  return googleSignedIn ? <h3>Signed in</h3> : <h3>Not signed in</h3>;
};

export default AuthHeader;
