import React, { useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {
  selectChapterParagraphs,
  selectReadingSentenceIdx,
  selectSentenceStartTimes,
} from "../selectors";
import { setSentence } from "../actions";

const useStyles = makeStyles((theme) => ({
  activeSentence: {
    backgroundColor: "#FEFEBE",
  },
}));

const Sentence = (props) => {
  const {
    // active,
    addSpace,
    text,
    sentenceId,
    startTime,
    setPlaybackTime,
  } = props;
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
          activeSentenceIdx === sentenceId ? classes.activeSentence : ""
        }
        onClick={onClick}
      >
        {text}
      </span>
      {addSpace ? " " : ""}
    </>
  );
};

const ChapterBodyScroll = ({ setPlaybackTime }) => {
  const { chapterId } = useParams();
  const paragraphs = useSelector((state) =>
    selectChapterParagraphs(state, chapterId)
  );
  const sentenceStartTimes = useSelector((state) =>
    selectSentenceStartTimes(state, chapterId)
  );

  let sentenceCount = 0;

  return (
    <>
      {paragraphs.map((sentences, index) => {
        return (
          <Typography variant={"body1"} key={"paragraph_" + index} paragraph>
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
    </>
  );
};

export default ChapterBodyScroll;
