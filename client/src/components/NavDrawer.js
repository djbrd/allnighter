import React from "react";
import { NavLink } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const useStyles = makeStyles((theme) => ({
  active: {
    backgroundColor: theme.palette.action.selected,
  },
}));

const routes = [
  { label: "Home", path: "/" },
  { label: "Content", path: "/content" },
];

const NavDrawer = (props) => {
  const classes = useStyles();

  const { open, onClose } = props;

  return (
    <Drawer open={open} onClose={onClose}>
      <List>
        {routes.map((route, index) => {
          return (
            <ListItem
              onClick={onClose}
              key={index}
              component={NavLink}
              to={route.path}
              activeClassName={classes.active}
              exact
            >
              <ListItemText>{route.label}</ListItemText>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
