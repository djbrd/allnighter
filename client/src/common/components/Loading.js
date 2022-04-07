import makeStyles from '@mui/styles/makeStyles';
import CircularProgress from "@mui/material/CircularProgress";

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
