import React, { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Box, Typography } from "@material-ui/core";

import ContentFailed from "./ContentFailed";
import Loading from "../../common/components/Loading";

import { initChapterBody, setChapter } from "../actions";
import {
  selectIsContentInitialised,
  selectChapterParagraphs,
  selectChapterTitle,
} from "../selectors";

const useStyles = makeStyles((theme) => ({
  paper: (props) => ({
    paddingLeft: props.readingPadding,
    paddingRight: props.readingPadding,
    background: "white",
  }),
  textContainer: (props) => ({
    width: props.readingWidth,
    paddingBottom: "70vh",
  }),
}));

// For the page part of the layout
const ChapterPage = (props) => {
  // Handle reading width and padding depending on size of window
  const [width, setWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
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
    <Box mt={2} display="flex" justifyContent="center">
      <div className={classes.paper}>
        <div className={classes.textContainer}>{props.children}</div>
      </div>
    </Box>
  );
};

// Handles content of the page
const ChapterLayout = (props) => {
  const { children } = props;
  const { chapterId } = useParams();
  const [failedInit, setFailedInit] = useState(false);
  const isContentInitialised = useSelector(selectIsContentInitialised);
  const paragraphs = useSelector((state) =>
    selectChapterParagraphs(state, chapterId)
  );
  const title = useSelector((state) => selectChapterTitle(state, chapterId));
  const dispatch = useDispatch();

  useEffect(() => {
    if (isContentInitialised && !failedInit) {
      if (paragraphs === null) {
        const getGetChapterContent = async () => {
          try {
            const res = await axios(
              `${process.env.REACT_APP_API_URL}/chapters/${chapterId}`
            );

            let { chapter } = res.data;
            dispatch(initChapterBody(chapter));
          } catch (err) {
            setFailedInit(true);
          }
        };
        getGetChapterContent();
      } else {
        dispatch(setChapter(chapterId));
      }
    }
  }, [failedInit, isContentInitialised, chapterId, paragraphs, dispatch]);

  return (
    <ChapterPage>
      <Box mt={4} mb={8}>
        <Typography component="h1" variant="h1">
          {title ? title : " "}
        </Typography>
      </Box>
      {failedInit ? (
        <ContentFailed />
      ) : !isContentInitialised || !paragraphs ? (
        <Loading />
      ) : (
        children
      )}
    </ChapterPage>
  );
};

export default ChapterLayout;
