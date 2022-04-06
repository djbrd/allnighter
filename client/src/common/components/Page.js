import { useLayoutEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  paper: (props) => ({
    paddingLeft: props.readingPadding,
    paddingRight: props.readingPadding,
    background: theme.palette.background.paper,
    minHeight: `calc(100vh - ${theme.spacing(11)}px)`,
  }),
  textContainer: (props) => ({
    width: props.readingWidth,
  }),
}));

// For the page part of the layout
const Page = (props) => {
  // Handle reading width and padding depending on size of window
  const [width, setWidth] = useState(document.documentElement.clientWidth);
  // window.innerWidth

  useLayoutEffect(() => {
    const handleResize = () => {
      setWidth(document.documentElement.clientWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  // For interpolation
  const minWidth = 320;
  const maxWidth = 1280;
  const minReadingPadding = 16;
  const maxReadingPadding = 128;
  const maxReadingWidth = 650;
  let readingPadding = maxReadingPadding;
  let readingWidth = maxReadingWidth;

  if (width < maxWidth) {
    const factor =
      width <= minWidth ? 1 : (maxWidth - width) / (maxWidth - minWidth);
    readingPadding -= Math.round(
      factor * (maxReadingPadding - minReadingPadding)
    );
    readingWidth =
      width - 2 * readingPadding < maxReadingWidth
        ? width - 2 * readingPadding
        : maxReadingWidth;
  }

  const classes = useStyles({ readingWidth, readingPadding });
  return (
    <Box display="flex" justifyContent="center">
      <div className={classes.paper}>
        <div className={classes.textContainer}>{props.children}</div>
      </div>
    </Box>
  );
};

export default Page;
