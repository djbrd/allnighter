import React, { useState, useEffect, useCallback } from "react";
import makeStyles from '@mui/styles/makeStyles';
import { AppBar, Toolbar, useScrollTrigger, Slide } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  appBar: {
    top: "auto",
    bottom: 0,
    backgroundColor: theme.palette.background.default,
  },
  toolBar: {
    minHeight: theme.spacing(5),
  },
}));

const Footer = ({ children, stayPut }) => {
  const classes = useStyles();
  const [justReleased, setJustReleased] = useState(false);
  const trigger =
    useScrollTrigger({
      threshold: 100,
    }) &&
    !stayPut &&
    !justReleased;

  useEffect(() => {
    setJustReleased(!stayPut);
  }, [stayPut]);

  const listenToScroll = useCallback(() => {
    setJustReleased(false);
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", listenToScroll);
    return () => window.removeEventListener("scroll", listenToScroll);
  }, [listenToScroll]);

  return (
    <Slide
      appear={false}
      direction="up"
      in={!trigger}
      timeout={{ enter: 500, exit: 1000 }}
    >
      <AppBar
        position="fixed"
        color="inherit"
        className={classes.appBar}
        elevation={0}
      >
        <Toolbar className={classes.toolBar}>{children}</Toolbar>
      </AppBar>
    </Slide>
  );
};

export default Footer;
