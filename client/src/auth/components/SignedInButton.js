import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { IconButton, Avatar, Menu, MenuItem } from "@material-ui/core";

import { signout } from "../actions";
import { selectUserName } from "../selectors";

const SignedInButton = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);
  const userName = useSelector(selectUserName);

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
      <IconButton onClick={handleButtonClick} size="small">
        <Avatar>{userName.charAt(0).toUpperCase()}</Avatar>
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
