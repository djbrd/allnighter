import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import NavDrawer from "./NavDrawer";
import AuthModal from "../auth/components/AuthModal";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const Header = () => {
  const classes = useStyles();

  const [drawerOpen, setDrawerOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    // <div>
    //   <Link to="/">Redux Auth</Link>
    //   <AuthLink />
    // </div>
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            edge="start"
            color="inherit"
            classes="menuButton"
            onClick={() => setDrawerOpen(true)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6">all-nighter</Typography>
          <IconButton color="inherit" onClick={() => setModalOpen(true)}>
            <AccountCircleIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
      <AuthModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </div>
  );
};

export default Header;
