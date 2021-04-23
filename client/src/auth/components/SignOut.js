import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsSignedIn } from "../selectors";
import { useHistory } from "react-router";

import { signout } from "../actions";

function SignOut() {
  const isSignedIn = useSelector(selectIsSignedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isSignedIn) {
      history.push("/");
    } else {
      dispatch(signout());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Sorry to see you go</h1>
    </div>
  );
}

export default SignOut;
