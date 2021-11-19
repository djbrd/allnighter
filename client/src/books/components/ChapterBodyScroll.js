import React, { useRef, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import { Typography } from "@material-ui/core";
import {
  selectChapterParagraphs,
  selectReadingSentenceIdx,
} from "../selectors";

const useStyles = makeStyles((theme) => ({
  activeSentence: {
    backgroundColor: "#FEFEBE",
  },
}));

const Sentence = (props) => {
  const { active, addSpace, text } = props;
  const sentenceRef = useRef(null);
  const classes = useStyles();

  // Scroll the sentence to be visible when it's active
  useEffect(() => {
    if (active) {
      let offset = window.visualViewport.height * 0.3;
      if (offset < 100) offset = 100;
      window.scrollTo({
        top: sentenceRef.current.offsetTop - offset,
        behavior: "smooth",
      });
    }
  }, [active]);

  return (
    <>
      <span ref={sentenceRef} className={active ? classes.activeSentence : ""}>
        {text}
      </span>
      {addSpace ? " " : ""}
    </>
  );
};

const ChapterBodyScroll = () => {
  const { chapterId } = useParams();
  const paragraphs = useSelector((state) =>
    selectChapterParagraphs(state, chapterId)
  );
  const activeSentenceIdx = useSelector(selectReadingSentenceIdx);

  let sentenceCount = 0;

  return (
    <>
      {paragraphs.map((sentences, index) => {
        return (
          <Typography variant={"body1"} key={"paragraph_" + index} paragraph>
            {sentences.map((sentence, index) => {
              return (
                <Sentence
                  key={"sentence_" + sentenceCount++}
                  text={sentence}
                  active={activeSentenceIdx === sentenceCount}
                  addSpace={index !== sentences.length - 1}
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
