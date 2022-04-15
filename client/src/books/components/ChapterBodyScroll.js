import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, Link } from "react-router-dom";

import makeStyles from "@mui/styles/makeStyles";
import { Typography, Box, Button } from "@mui/material";
import ArrowRightAltIcon from "@mui/icons-material/ArrowRightAlt";
import {
  selectChapterId,
  selectChapterParagraphs,
  selectReadingSentenceIdx,
  selectSentenceStartTimes,
  selectNextChapterIndices,
} from "../selectors";
import { setSentence } from "../actions";

const useStyles = makeStyles((theme) => ({
  activeSentence: {
    backgroundColor: "#FFF0F5",
  },
  inactiveSentence: {
    color: theme.palette.grey[800],
  },
  bodyPadding: {
    paddingBottom: "70vh",
  },
  link: {
    textTransform: "lowercase",
    fontWeight: "normal",
  },
}));

const Sentence = (props) => {
  const { addSpace, text, sentenceId, startTime, setPlaybackTime } = props;
  const sentenceRef = useRef(null);
  const classes = useStyles();

  const activeSentenceIdx = useSelector(selectReadingSentenceIdx);
  const dispatch = useDispatch();

  // Scroll the sentence to be visible when it's active
  useEffect(() => {
    if (activeSentenceIdx === sentenceId) {
      let offset = window.visualViewport.height * 0.3;
      if (offset < 100) offset = 100;
      window.scrollTo({
        top: sentenceRef.current.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, [activeSentenceIdx, sentenceId]);

  // Make sentence active when it's clicked
  const onClick = () => {
    if (startTime !== null) {
      setPlaybackTime(startTime);
      dispatch(setSentence(sentenceId));
    }
  };

  return (
    <>
      <span
        ref={sentenceRef}
        className={
          activeSentenceIdx === sentenceId
            ? classes.activeSentence
            : classes.inactiveSentence
        }
        onClick={onClick}
      >
        {text}
      </span>
      {addSpace ? " " : ""}
    </>
  );
};

const NextChapterLink = ({ partIdx, chapterIdx }) => {
  const classes = useStyles();
  const nextChapterIndices = useSelector((state) =>
    selectNextChapterIndices(state, partIdx, chapterIdx)
  );

  if (!nextChapterIndices) {
    return null;
  }
  const { nextPartIdx, nextChapterIdx } = nextChapterIndices;

  return (
    <Box mt={4} sx={{ width: "100%", textAlign: "right" }}>
      <Button
        component={Link}
        to={`/${nextPartIdx}/${nextChapterIdx}`}
        color="grey"
        className={classes.link}
      >
        <ArrowRightAltIcon />
      </Button>
    </Box>
  );
};

const ChapterBodyScroll = ({ setPlaybackTime }) => {
  const { partIdx, chapterIdx } = useParams();
  const chapterId = useSelector((state) =>
    selectChapterId(state, partIdx, chapterIdx)
  );
  const paragraphs = useSelector((state) =>
    selectChapterParagraphs(state, chapterId)
  );
  const sentenceStartTimes = useSelector((state) =>
    selectSentenceStartTimes(state, chapterId)
  );

  const classes = useStyles();

  let sentenceCount = 0;

  return (
    <div className={classes.bodyPadding}>
      {paragraphs.map((sentences, index) => {
        return (
          <Typography variant="body1" key={"paragraph_" + index} paragraph>
            {sentences.map((sentence, index) => {
              return (
                <Sentence
                  startTime={
                    sentenceStartTimes.length > sentenceCount
                      ? sentenceStartTimes[sentenceCount]
                      : null
                  }
                  key={"sentence_" + sentenceCount++}
                  text={sentence}
                  sentenceId={sentenceCount}
                  addSpace={index !== sentences.length - 1}
                  setPlaybackTime={setPlaybackTime}
                />
              );
            })}
          </Typography>
        );
      })}
      <NextChapterLink partIdx={partIdx} chapterIdx={chapterIdx} />
    </div>
  );
};

export default ChapterBodyScroll;
