import React from "react";
import makeStyles from '@mui/styles/makeStyles';
import { useDispatch, useSelector } from "react-redux";

import Button from "@mui/material/Button";

import { googleSignIn } from "../actions";
import { selectIsAuthorising } from "../selectors";

const useStyles = makeStyles((theme) => ({
  google: {
    // backgroundColor: red[500], // Officially "#DB4437"
    // "&:hover": { backgroundColor: red[400] },
    backgroundColor: "#C94437",
    "&:hover": { backgroundColor: "#DB4437" },
    color: "white",
    textTransform: "none",
    marginTop: theme.spacing(2),
  },
}));

const GoogleSignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthorising = useSelector(selectIsAuthorising);

  const onSignIn = () => {
    dispatch(googleSignIn());
  };

  return (
    <Button
      onClick={onSignIn}
      className={classes.google}
      variant="contained"
      fullWidth
      disabled={isAuthorising}
    >
      Sign in with Google
    </Button>
  );
};

export default GoogleSignIn;
