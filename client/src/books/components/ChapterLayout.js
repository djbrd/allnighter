import { useEffect, useState } from "react";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Box, Typography } from "@mui/material";

import Page from "../../common/components/Page";
import ContentFailed from "./ContentFailed";
import Loading from "../../common/components/Loading";

import { initChapterBody, setChapter } from "../actions";
import {
  selectChapterId,
  selectIsContentInitialised,
  selectChapterParagraphs,
  selectChapterTitle,
} from "../selectors";

// Handles content of the page
const ChapterLayout = (props) => {
  const { children } = props;
  const [failedInit, setFailedInit] = useState(false);
  const { partIdx, chapterIdx } = useParams();
  const chapterId = useSelector((state) =>
    selectChapterId(state, partIdx, chapterIdx)
  );

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
    <Page>
      <Box mt={8} mb={6}>
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
    </Page>
  );
};

export default ChapterLayout;
