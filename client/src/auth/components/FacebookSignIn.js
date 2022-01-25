import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { useDispatch, useSelector } from "react-redux";

import Button from "@material-ui/core/Button";
import FacebookIcon from "@material-ui/icons/Facebook";

import { facebookSignIn } from "../actions";
import { selectIsAuthorising } from "../selectors";

const useStyles = makeStyles((theme) => ({
  facebook: {
    backgroundColor: "#4267A3",
    "&:hover": { backgroundColor: "#4267B2" }, // Facebook blue
    color: "white",
    textTransform: "none",
    margin: theme.spacing(1),
  },
}));

const FacebookSignIn = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isAuthorising = useSelector(selectIsAuthorising);

  const onSignIn = () => {
    dispatch(facebookSignIn());
  };

  return (
    <Button
      onClick={onSignIn}
      className={classes.facebook}
      variant="contained"
      fullWidth
      startIcon={<FacebookIcon />}
      disabled={isAuthorising}
    >
      Sign in with Facebook
    </Button>
  );
};

export default FacebookSignIn;
