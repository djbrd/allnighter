import { makeStyles } from "@material-ui/core/styles";
import Dialog from "@material-ui/core/Dialog";
import Container from "@material-ui/core/Container";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    "& form": {
      width: "100%",
    },
    margin: theme.spacing(2, 0, 2),
  },
}));

const FormDialog = (props) => {
  const { children, open, onClose } = props;
  const classes = useStyles();

  return (
    <Dialog
      open={open}
      onClose={onClose}
      // disableBackdropClick={disableClose}
      // disableEscapeKeyDown={disableClose}
      fullWidth
      maxWidth="xs"
    >
      <Container className={classes.container}>{children}</Container>
    </Dialog>
  );
};

export default FormDialog;
