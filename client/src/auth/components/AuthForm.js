import makeStyles from '@mui/styles/makeStyles';

import { Container, Typography } from "@mui/material";

import LocalSignIn from "./LocalSignIn";
import GoogleSignIn from "./GoogleSignIn";
import FacebookSignIn from "./FacebookSignIn";

const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(2, "auto", 2),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: theme.palette.common.white,
  },
  social: {
    margin: theme.spacing(3, 0, 2),
  },
  or: {
    marginTop: theme.spacing(1),
  },
}));

const AuthForm = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="xs" className={classes.container}>
      <LocalSignIn />
      <div className={classes.or}>
        <Typography>OR</Typography>
      </div>
      <GoogleSignIn />
      <FacebookSignIn />
    </Container>
  );
};

export default AuthForm;
