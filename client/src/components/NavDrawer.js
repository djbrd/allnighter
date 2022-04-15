import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Drawer,
  List,
  ListItem,
  Divider,
  ListItemButton,
  ListItemText,
  Collapse,
} from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import Sharing from "../meta/components/Sharing";

import RotatingChevron from "../common/components/RotatingChevron";

const routes = [
  [
    { label: "Contents", path: "/", variant: "h2" },
    { label: "Epigraphs", path: "/epigraphs", variant: "h4" },
    { label: "Blurb", path: "/backcover", variant: "h4" },
  ],
  [
    { label: "Feedback", path: "/contact", variant: "h3" },
    { label: "Get a copy", path: "/copy", variant: "h3" },
    { label: "Get full access", path: "/access", variant: "h3" },
  ],
];

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: theme.palette.background.default,
  },
  listButton: {
    textTransform: "lowercase",
    fontWeight: "bold",
    padding: `${theme.spacing(0)} ${theme.spacing(4)}`,
  },
  sharing: {
    padding: `0 ${theme.spacing(4)}`,
  },
  divider: {
    padding: `${theme.spacing(2)} 0`,
  },
  list: {
    paddingTop: theme.spacing(5),
  },
}));

const NavDrawer = (props) => {
  const { open, onClose } = props;
  const [sharing, setSharing] = useState(false);

  const handleClick = () => {
    setSharing(!sharing);
  };

  const classes = useStyles();
  return (
    <Drawer open={open} onClose={onClose} classes={{ paper: classes.paper }}>
      <List className={classes.list}>
        <ListItem>
          <ListItemButton onClick={handleClick} className={classes.listButton}>
            <ListItemText primaryTypographyProps={{ variant: "h2" }}>
              Share
            </ListItemText>
            <RotatingChevron open={sharing} setOpen={setSharing} />
          </ListItemButton>
        </ListItem>
        <Collapse in={sharing} timeout="auto" unmountOnExit>
          <div className={classes.sharing}>
            <Sharing />
          </div>
        </Collapse>
        {routes.map((sectionRoutes, index) => {
          return (
            <React.Fragment key={index}>
              <div className={classes.divider}>
                <Divider />
              </div>
              {sectionRoutes.map((route, index) => {
                const variant = route.variant;
                return (
                  <ListItem key={index}>
                    <ListItemButton
                      onClick={onClose}
                      className={classes.listButton}
                      component={Link}
                      to={route.path}
                      color="grey"
                    >
                      <ListItemText primaryTypographyProps={{ variant }}>
                        {route.label}
                      </ListItemText>
                    </ListItemButton>
                  </ListItem>
                );
              })}
            </React.Fragment>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavDrawer;
