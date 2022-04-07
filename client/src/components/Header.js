import React, { useState } from "react";
import { Link } from "react-router-dom";
import makeStyles from "@mui/styles/makeStyles";
import {
  AppBar,
  Toolbar,
  Grid,
  Typography,
  // IconButton,
  Button,
  useScrollTrigger,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import NavDrawer from "./NavDrawer";
import HideOnScroll from "./HideOnScroll";
// import AuthButton from "../auth/components/AuthButton";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  side: {
    flexBasis: "10%",
    textAlign: "left",
  },
  centre: {
    flexBasis: "80%",
    textAlign: "center",
  },
  appbar: {
    backgroundColor: theme.palette.background.default,
    color: theme.palette.common.black,
  },
  toolbar: {
    minHeight: theme.spacing(6),
    padding: 0,
  },
  title: {
    textTransform: "lowercase",
  },
  menuButton: {
    // marginLeft: theme.spacing(2),
    // backgroundColor: theme.palette.background.default,
    // boxShadow: "none",
    // "&:hover": {
    //   // backgroundColor: theme.palette.background.default,
    //   boxShadow: "none",
    // },
  },
  // fadeIn: {
  //   position: "fixed",
  //   top: theme.spacing(5),
  //   height: theme.spacing(15),
  //   width: "100%",
  //   backgroundImage: "linear-gradient(white, transparent)",
  // },
}));

const Header = ({ hideTitle }) => {
  const classes = useStyles();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const trigger = useScrollTrigger({
    threshold: 100,
  });

  return (
    <>
      <HideOnScroll direction="down" trigger={trigger}>
        <AppBar
          position="fixed"
          className={classes.appbar}
          elevation={0}
          color="default"
        >
          <Toolbar className={classes.toolbar}>
            <Grid
              container
              direction="row"
              justifyContent="center"
              alignItems="center"
              className={classes.grid}
            >
              <div className={classes.side}>
                <Button
                  color="grey"
                  className={classes.menuButton}
                  size="large"
                  onClick={() => setDrawerOpen(true)}
                  // disableRipple
                  // disableFocusRipple
                  // variant="contained"
                >
                  <MenuIcon />
                </Button>
              </div>
              <div className={classes.centre}>
                {!hideTitle && (
                  <Button
                    size="large"
                    className={classes.titleButton}
                    component={Link}
                    to={"/"}
                    color="grey"
                  >
                    <Typography variant="body2" className={classes.title}>
                      {process.env.REACT_APP_FEATURED_BOOK_TITLE}
                    </Typography>
                  </Button>
                )}
              </div>
              <div className={classes.side}>{/* <AuthButton /> */}</div>
            </Grid>
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar className={classes.toolbar} />
      <NavDrawer open={drawerOpen} onClose={() => setDrawerOpen(false)} />
    </>
  );
};

export default Header;
