import React, { useState } from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Button,
} from "@material-ui/core";
import MenuIcon from "@material-ui/icons/Menu";

import NavDrawer from "./NavDrawer";
import AuthButton from "../auth/components/AuthButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  titleButton: {
    margin: "0 auto",
  },
  title: {
    textTransform: "lowercase",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  return (
    <div className={classes.root}>
      <AppBar position="fixed" className={classes.appbar} elevation={0}>
        <Toolbar>
          <IconButton
            color="inherit"
            className={classes.menuButton}
            size="small"
            onClick={() => setDrawerOpen(true)}
            disableRipple
            disableFocusRipple
          >
            <MenuIcon />
          </IconButton>
          <Button component={Link} to={"/"} className={classes.titleButton}>
            <Typography variant="caption" className={classes.title}>
              all-nighter
            </Typography>
          </Button>
          <AuthButton />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Header;
