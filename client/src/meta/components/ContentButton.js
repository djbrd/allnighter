import { Link } from "react-router-dom";
import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";

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
        disableFocusRippleß
      >
        <MenuIcon />
      </Button>
    </div>
  );
};

export default ContentButton;
