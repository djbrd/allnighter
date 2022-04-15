import { useLayoutEffect, useState } from "react";
import makeStyles from "@mui/styles/makeStyles";
import { Box } from "@mui/material";

const useStyles = makeStyles((theme) => ({
  paper: (props) => ({
    paddingLeft: props.readingPadding,
    paddingRight: props.readingPadding,
    background: theme.palette.background.paper,
    minHeight: `calc(100vh - ${theme.spacing(11)})`,
  }),
  textContainer: (props) => ({
    width: props.readingWidth,
    marginTop: props.marginTop,
  }),
}));

// For the page part of the layout
const Page = (props) => {
  const maxReadingWidth = props.maxReadingWidth || 650;

  // Handle reading width and padding depending on size of window
  const [dimensions, setDimensions] = useState({
    width: document.documentElement.clientWidth,
    height: document.documentElement.clientHeight,
  });
  // window.innerWidth

  useLayoutEffect(() => {
    const handleResize = () => {
      setDimensions({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
      });
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const { width } = dimensions;

  // For interpolation
  const minWidth = 375;
  const maxWidth = 1280;
  const minReadingPadding = 16;
  const maxReadingPadding = 128;
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

  const minMarginTop = 32;
  const maxMarginTop = 64;
  let marginTop = maxMarginTop;
  const maxMarginTopWidth = 900;
  if (width < maxMarginTopWidth) {
    const factor =
      width <= minWidth
        ? 1
        : (maxMarginTopWidth - width) / (maxMarginTopWidth - minWidth);
    marginTop -= Math.round(factor * (maxMarginTop - minMarginTop));
  }

  const classes = useStyles({
    readingWidth,
    readingPadding,
    marginTop,
  });
  return (
    <Box display="flex" justifyContent="center">
      <div className={classes.paper}>
        <div className={classes.textContainer}>{props.children}</div>
      </div>
    </Box>
  );
};

export default Page;
