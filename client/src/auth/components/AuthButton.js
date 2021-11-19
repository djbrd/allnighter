import React from "react";
import { useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import CircularProgress from "@material-ui/core/CircularProgress";

import SignedInButton from "./SignedInButton";
import SignedOutButton from "./SignedOutButton";
import {
  selectIsInitialising,
  selectIsSignedIn,
  selectIsSigningOut,
} from "../selectors";

const AuthButton = () => {
  const isInitialising = useSelector(selectIsInitialising);
  const isSigningOut = useSelector(selectIsSigningOut);
  const isSignedIn = useSelector(selectIsSignedIn);

  return (
    <>
      {isInitialising || isSigningOut ? (
        <Button size="small">
          <Avatar>
            <CircularProgress />
          </Avatar>
        </Button>
      ) : isSignedIn ? (
        <SignedInButton />
      ) : (
        <SignedOutButton />
      )}
    </>
  );
};

export default AuthButton;
