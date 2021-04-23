import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../selectors";
import { useHistory } from "react-router";

import LocalSignUp from "./LocalSignUp";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

function SignUp() {
  const isSignedIn = useSelector(selectIsSignedIn);
  const history = useHistory();

  useEffect(() => {
    if (isSignedIn) {
      history.push("/feature");
    }
  });

  return (
    <div>
      <LocalSignUp />
      <GoogleSignIn />
      <FacebookSignIn />
    </div>
  );
}

export default SignUp;
