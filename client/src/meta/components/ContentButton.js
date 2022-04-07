import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import makeStyles from "@mui/styles/makeStyles";
import MenuIcon from "@mui/icons-material/Menu";

const useStyles = makeStyles((theme) => ({
  button: {
    boxShadow: "none",
    backgroundColor: theme.palette.background.default,
    "&:hover": {
      backgroundColor: theme.palette.background.default,
    },
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  esau: {
    position: "fixed",
    top: 0,
    left: 0,
    minHeight: theme.spacing(5),
    backgroundColor: theme.palette.background.default,
    display: "inline",
  },
}));

const ContentButton = () => {
  const styles = useStyles();
  return (
    <div className={styles.esau}>
      <Button
        component={Link}
        to="/"
        className={styles.button}
        disableRipple
        disableFocusRipple
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default ContentButton;
