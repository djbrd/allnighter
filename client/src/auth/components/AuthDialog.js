import React from "react";
import { useSelector } from "react-redux";

import Dialog from "@material-ui/core/Dialog";
import AuthForm from "./AuthForm";

import { selectIsAuthorising } from "../selectors";

const AuthDialog = (props) => {
  const { open, onClose } = props;
  const isAuthorising = useSelector(selectIsAuthorising);

  return (
    <Dialog
      open={open}
      onClose={onClose}
      disableBackdropClick={isAuthorising}
      disableEscapeKeyDown={isAuthorising}
      fullWidth
      maxWidth="xs"
    >
      <AuthForm />
    </Dialog>
  );
};

export default AuthDialog;
