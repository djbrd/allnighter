import React, { useState } from "react";
import { useDispatch } from "react-redux";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

import { signout } from "../actions";

const SignedInButton = () => {
  const dispatch = useDispatch();
  const [anchorEl, setAnchorEl] = useState(null);

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
      <Button onClick={handleButtonClick} size="small">
        <Avatar>D</Avatar>
      </Button>
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
