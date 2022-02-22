import React, { useState } from "react";

import { IconButton, Avatar } from "@material-ui/core";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import AuthDialog from "./AuthDialog";

const SignedOutButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <IconButton onClick={() => setDialogOpen(true)} size="small">
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </IconButton>
      <AuthDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default SignedOutButton;
