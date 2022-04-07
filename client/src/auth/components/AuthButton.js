import React from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Avatar from "@mui/material/Avatar";
import CircularProgress from "@mui/material/CircularProgress";

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
        <Button color="grey" size="small">
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
