import React from "react";
import { useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";

import LocalSignIn from "./LocalSignIn";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";
import { selectIsAuthorising } from "../selectors";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, 0, 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  social: {
    margin: theme.spacing(3, 0, 2),
  },
  or: {
    marginTop: theme.spacing(1),
  },
}));

const AuthDialog = (props) => {
  const classes = useStyles();
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
      <Container className={classes.container} maxWidth="xs">
        <LocalSignIn />
        <div className={classes.or}>
          <Typography>OR</Typography>
        </div>
        <GoogleSignIn />
        <FacebookSignIn />
      </Container>
    </Dialog>
  );
};

export default AuthDialog;
