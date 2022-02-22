import { makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";

const useStyles = makeStyles((theme) => ({
  progress: {
    margin: "30vh auto 0",
    display: "block",
  },
}));

const Loading = () => {
  const classes = useStyles();
  return <CircularProgress className={classes.progress} />;
};

export default Loading;
