import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectIsSignedIn } from "../selectors";

const AuthLink = () => {
  const isSignedIn = useSelector(selectIsSignedIn);

  return isSignedIn ? (
    <Link to="/signout">Sign Out</Link>
  ) : (
    <>
      <Link to="/signin">Sign In</Link>
      <Link to="/signup">Sign Up</Link>
    </>
  );
};

export default AuthLink;
