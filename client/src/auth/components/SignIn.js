import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../selectors";
import { useHistory } from "react-router";

import LocalSignIn from "./LocalSignIn";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

function SignIn() {
  const isSignedIn = useSelector(selectIsSignedIn);
  const history = useHistory();

  useEffect(() => {
    if (isSignedIn) {
      history.push("/feature");
    }
  });

  return (
    <div>
      <LocalSignIn />
      <GoogleSignIn />
      <FacebookSignIn />
    </div>
  );
}

export default SignIn;
