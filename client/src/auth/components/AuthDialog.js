import React from "react";
import { useSelector } from "react-redux";

import Dialog from "@mui/material/Dialog";
import AuthForm from "./AuthForm";

import { selectIsAuthorising } from "../selectors";

const AuthDialog = (props) => {
  const { open, onClose } = props;
  const isAuthorising = useSelector(selectIsAuthorising);

  const onDialogClose = (event, reason) => {
    if (!isAuthorising) {
      onClose();
    }
  };

  return (
    <Dialog open={open} onClose={onDialogClose} fullWidth maxWidth="xs">
      <AuthForm />
    </Dialog>
  );
};

export default AuthDialog;
