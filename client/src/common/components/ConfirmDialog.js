import React from "react";

import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Grid from "@material-ui/core/Grid";

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
              color="default"
              fullWidth
            >
              Yes
            </Button>
          </Grid>
        </Grid>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmDialog;
