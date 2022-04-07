import React, { useState } from "react";

import { IconButton, Avatar } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";

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
