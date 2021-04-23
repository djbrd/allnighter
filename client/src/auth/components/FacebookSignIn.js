import React from "react";
import { useDispatch } from "react-redux";
import { facebookSignIn } from "../actions";

const FacebookSignIn = () => {
  const dispatch = useDispatch();

  const onSignIn = () => {
    dispatch(facebookSignIn());
  };

  return <button onClick={onSignIn}>Facebook</button>;
};

export default FacebookSignIn;
