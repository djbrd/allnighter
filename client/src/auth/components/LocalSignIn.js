import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";

import ControlledTextField from "../../common/components/ControlledTextField";
import { signing, signin, signup, signingError } from "../actions";
import { selectIsAuthorising } from "../selectors";

const useStyles = makeStyles((theme) => ({
  form: {
    width: "100%",
  },
  submit: {
    margin: theme.spacing(1, 0),
  },
  linklikebutton: {
    textTransform: "none",
    "&:hover": {
      backgroundColor: "transparent",
      textDecoration: "underline",
    },
  },
}));

const schema = Yup.object({
  email: Yup.string().email("Invalid email address").required("Required"),
  password: Yup.string().required("Required"),
});

export default function LocalSignIn() {
  const [inNotUp, setInNotUp] = useState(true);
  const classes = useStyles();
  const isAuthorising = useSelector(selectIsAuthorising);
  const dispatch = useDispatch();

  const { control, handleSubmit, setError } = useForm({
    defaultValues: { email: "", password: "" },
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data) => {
    try {
      dispatch(signing());
      const path = inNotUp ? "signin" : "signup";
      const res = await axios.post(
        `${process.env.REACT_APP_API_URL}/${path}`,
        data
      );
      const { token } = res.data;
      dispatch(inNotUp ? signin(token) : signup(token));
    } catch (e) {
      if (e.response.status === 422) {
        for (const fieldKey in e.response.data) {
          const msg = e.response.data[fieldKey];
          setError(fieldKey, { type: "manual", message: msg });
        }
      } else if (e.response.status === 401) {
        setError("password", { type: "manual", message: "Invalid password" });
      }
      dispatch(signingError());
    }
  };

  return (
    <React.Fragment>
      <form
        className={classes.form}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Controller
          name="email"
          control={control}
          render={(props) => <ControlledTextField {...props} type="email" />}
        />
        <Controller
          name="password"
          control={control}
          render={(props) => <ControlledTextField {...props} type="password" />}
        />
        <Button
          type="submit"
          disabled={isAuthorising}
          variant="contained"
          color="primary"
          fullWidth
          className={classes.submit}
        >
          {inNotUp ? "Sign In" : "Sign Up"}
        </Button>
      </form>
      <Grid container style={{ justifyContent: "space-between" }}>
        <Grid item xs>
          <Button
            variant="text"
            color="primary"
            className={classes.linklikebutton}
            disabled
          >
            Forgot password?
          </Button>
        </Grid>
        <Grid item>
          <Button
            variant="text"
            color="primary"
            className={classes.linklikebutton}
            onClick={() => setInNotUp(!inNotUp)}
            disabled={isAuthorising}
            disableRipple
          >
            {inNotUp
              ? "Don't have an account? Sign Up"
              : "Already have an account? Sign In"}
          </Button>
        </Grid>
      </Grid>
    </React.Fragment>
  );
}
