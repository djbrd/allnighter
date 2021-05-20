import React from "react";
import Modal from "@material-ui/core/Modal";
import Typography from "@material-ui/core/Typography";

const AuthModal = (props) => {
  const { open, handleClose } = props;
  return (
    <Modal open={open} onClose={handleClose}>
      <div>
        <Typography variant="h6">Howdy</Typography>
      </div>
    </Modal>
  );
};

export default AuthModal;