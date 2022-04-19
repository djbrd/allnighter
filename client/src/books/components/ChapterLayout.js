import { useEffect, useState } from "react";
import { api } from "../../utils/api";
import { useSelector, useDispatch } from "react-redux";
import { Link as RouterLink, useParams } from "react-router-dom";
import { Box, Typography, Link } from "@mui/material";

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

const AuthorisedContent = () => {
  return (
    <>
      <Typography paragraph>
        This content is currently only available to authorised users
      </Typography>
      <Typography paragraph>
        If you would like to be an authorised user, you can request an
        invitation{" "}
        <Link component={RouterLink} to="/access">
          here
        </Link>
      </Typography>
      <Typography paragraph>
        If you would like a promotional copy, you can request one{" "}
        <Link component={RouterLink} to="/copy">
          here
        </Link>
      </Typography>
    </>
  );
};

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
            const res = await api(`/chapters/${chapterId}`);

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
      <Box mb={6}>
        <Typography component="h1" variant="h1">
          {title ? title : " "}
        </Typography>
      </Box>
      {failedInit ? (
        <ContentFailed />
      ) : !isContentInitialised || !paragraphs ? (
        <Loading />
      ) : paragraphs.length === 0 ? (
        <AuthorisedContent />
      ) : (
        children
      )}
    </Page>
  );
};

export default ChapterLayout;
