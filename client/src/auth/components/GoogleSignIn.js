import React from "react";
import { useDispatch } from "react-redux";
import { googleSignIn } from "../actions";

const GoogleSignIn = () => {
  const dispatch = useDispatch();

  const onSignIn = () => {
    dispatch(googleSignIn());
  };

  return (
    <button onClick={onSignIn} className="ui red google button">
      <i className="google icon" />
      Google
    </button>
  );
};

export default GoogleSignIn;
