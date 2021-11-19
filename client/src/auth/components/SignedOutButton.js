import React, { useState } from "react";

import Button from "@material-ui/core/Button";
import Avatar from "@material-ui/core/Avatar";
import AccountCircleIcon from "@material-ui/icons/AccountCircle";

import AuthDialog from "./AuthDialog";

const SignedOutButton = () => {
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <>
      <Button onClick={() => setDialogOpen(true)} size="small">
        <Avatar>
          <AccountCircleIcon />
        </Avatar>
      </Button>
      <AuthDialog open={dialogOpen} onClose={() => setDialogOpen(false)} />
    </>
  );
};

export default SignedOutButton;
