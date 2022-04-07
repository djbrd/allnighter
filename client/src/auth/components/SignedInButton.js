import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Avatar, Menu, MenuItem } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';

import { signout } from "../actions";
import { selectUserName } from "../selectors";

const useStyles = makeStyles((theme) => ({
  avatar: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
}));

const SignedInButton = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userName = useSelector(selectUserName);
  const styles = useStyles();

  const handleButtonClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    handleMenuClose();
    dispatch(signout());
  };

  return (
    <>
      <IconButton onClick={handleButtonClick} size="small" color="primary">
        <Avatar className={styles.avatar}>
          {userName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleSignOut}>Sign Out</MenuItem>
      </Menu>
    </>
  );
};

export default SignedInButton;
