import React from "react";
import { NavLink } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";

const routes = [
  { label: "Home", path: "/" },
  { label: "Books", path: "/books" },
];

const NavDrawer = (props) => {
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
