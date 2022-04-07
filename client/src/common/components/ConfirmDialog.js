import React from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import Grid from "@mui/material/Grid";

const ConfirmDialog = (props) => {
  const { title, children, open, onClose, onConfirm } = props;
  return (
    <Dialog open={open} onClose={onClose} aria-labelledby="confirm-dialog">
      <DialogTitle id="confirm-dialog">{title}</DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <Grid container style={{ justifyContent: "stretch" }}>
          <Grid item xs>
            <Button
              variant="contained"
              onClick={onClose}
              color="secondary"
              fullWidth
            >
              No
            </Button>
          </Grid>
          <Grid item xs>
            <Button
              variant="contained"
              onClick={() => {
                onClose();
                onConfirm();
              }}
              fullWidth>
              Yes
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
