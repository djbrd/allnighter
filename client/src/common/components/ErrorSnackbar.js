import { useState, useEffect } from "react";

import Snackbar from "@mui/material/Snackbar";
import MuiAlert from '@mui/material/Alert';

const ErrorSnackbar = ({ message, clearErrors }) => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (message) {
      setOpen(true);
    }
  }, [message]);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
    clearErrors("form");
  };

  return (
    <Snackbar
      open={open}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
    >
      <MuiAlert
        elevation={6}
        variant="filled"
        onClose={handleClose}
        severity="error"
      >
        {message}
      </MuiAlert>
    </Snackbar>
  );
};

export default ErrorSnackbar;
