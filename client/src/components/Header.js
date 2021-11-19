import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import NavDrawer from "./NavDrawer";
import AuthButton from "../auth/components/AuthButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  title: {
    margin: "0 auto",
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
      <AppBar position="fixed" color="default" elevation={0}>
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            className={classes.menuButton}
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.title} variant="caption">
            all-nighter
          </Typography>
          <AuthButton />
        </Toolbar>
      </AppBar>
      <Toolbar />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </div>
  );
};

export default Header;
