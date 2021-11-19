import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  CircularProgress,
  Container,
  Grid,
  Typography,
} from "@material-ui/core";

import { fetchChapterBody } from "../actions";
import {
  selectIsContentInitialised,
  selectChapterParagraphs,
  selectChapterTitle,
} from "../selectors";

const useStyles = makeStyles((theme) => ({
  container: {
    paddingBottom: "50vh",
  },
}));

const ChapterLayout = (props) => {
  const { children } = props;
  const { chapterId } = useParams();
  const isContentInitialised = useSelector(selectIsContentInitialised);
  const paragraphs = useSelector((state) =>
    selectChapterParagraphs(state, chapterId)
  );
  const title = useSelector((state) => selectChapterTitle(state, chapterId));
  const dispatch = useDispatch();
  const classes = useStyles();

  useEffect(() => {
    if (isContentInitialised && paragraphs === null) {
      dispatch(fetchChapterBody(chapterId));
    }
  }, [isContentInitialised, chapterId, paragraphs, dispatch]);

  return (
    <Container className={classes.container}>
      <Grid container>
        <Grid item xs={1} sm={2} md={3}></Grid>
        <Grid item xs={10} sm={8} md={6}>
          <Typography variant="h3" component="h6" gutterBottom>
            {title}
          </Typography>
          {isContentInitialised && paragraphs ? children : <CircularProgress />}
        </Grid>
        <Grid item xs={1} sm={2} md={3}></Grid>
      </Grid>
    </Container>
  );
};

export default ChapterLayout;
