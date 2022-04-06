import React from "react";
import { Link } from "react-router-dom";
import { Drawer, List, ListItem, Button, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Sharing from "../meta/components/Sharing";

const routes = [
  { label: "Content", path: "/" },
  { label: "Contact", path: "/contact" },
  { label: "Promo copy/access", path: "/copyaccess" },
  { label: '"Share"', path: "/sharing" },
];

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  navLink: {
    textTransform: "lowercase",
    fontSize: "1.17rem",
    fontWeight: "bold",
  },
}));

const NavDrawer = (props) => {
  const { open, onClose } = props;

  const classes = useStyles();
  return (
    <Drawer open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <div className={classes.list}>
        <List>
          {routes.map((route, index) => {
            return (
              <ListItem onClick={onClose} key={index}>
                <Button
                  className={classes.navLink}
                  component={Link}
                  to={route.path}
                >
                  <Typography variant="h3">{route.label}</Typography>
                </Button>
              </ListItem>
            );
          })}
          <ListItem>
            <Sharing />
          </ListItem>
        </List>
      </div>
    </Drawer>
  );
};

export default NavDrawer;
