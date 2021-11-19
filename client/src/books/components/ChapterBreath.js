import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Typography } from "@material-ui/core";

import ChapterLayout from "./ChapterLayout";

import { splitSentence, mergeSentences } from "../actions";
import { selectChapterParagraphs } from "../selectors";

// Background colors for sentences
const backgroundColors = [
  "	#e9e4ff",
  "#ffd4d4",
  "#e4ffe7",
  "#e4f0ff",
  "#feffe4",
];

const Sentence = (props) => {
  const { chapterId } = useParams();
  const { addSpace, text, paragraphId, sentenceId, color } = props;
  const dispatch = useDispatch();

  const onSplitSentence = () => {
    if (window.getSelection()) {
      let idx = window.getSelection().anchorOffset;
      // Allow error - split at nearest space
      if (text[idx] !== " ") {
        let leeway = 1;
        for (leeway = 1; leeway < 5; ++leeway) {
          if (text[idx + leeway] === " ") {
            idx += leeway;
            break;
          }
          if (text[idx - leeway] === " ") {
            idx -= leeway;
            break;
          }
        }
        if (leeway === 5) {
          console.log("Split point not found");
          return;
        }
      }
      dispatch(splitSentence(chapterId, paragraphId, sentenceId, idx));
    }
  };

  const onMergeSentences = () => {
    dispatch(mergeSentences(chapterId, paragraphId, sentenceId));
  };

  return (
    <>
      <span style={{ backgroundColor: `${color}` }} onClick={onSplitSentence}>
        {text}
      </span>
      {addSpace ? <span onClick={onMergeSentences}> </span> : ""}
    </>
  );
};

const ChapterBreath = () => {
  const { chapterId } = useParams();
  const paragraphs = useSelector((state) =>
    selectChapterParagraphs(state, chapterId)
  );

  let sentenceCount = 0;

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }
    const persistParagraphs = async () => {
      try {
        await axios.patch(
          `${process.env.REACT_APP_API_URL}/chapters/${chapterId}`,
          { paragraphs }
        );
      } catch (err) {
        // TODO
        console.log(err);
      }
    };
    persistParagraphs();
  }, [chapterId, paragraphs]);

  return (
    <ChapterLayout>
      {paragraphs ? (
        <>
          {paragraphs.map((sentences, paragraphIdx) => {
            return (
              <Typography
                variant={"body1"}
                key={"paragraph_" + paragraphIdx}
                paragraph
              >
                {sentences.map((sentence, sentenceIdx) => {
                  return (
                    <Sentence
                      key={"sentence_" + sentenceCount++}
                      paragraphId={paragraphIdx}
                      sentenceId={sentenceIdx}
                      text={sentence}
                      addSpace={sentenceIdx !== sentences.length - 1}
                      color={
                        backgroundColors[
                          sentenceCount % backgroundColors.length
                        ]
                      }
                    />
                  );
                })}
              </Typography>
            );
          })}
        </>
      ) : null}
    </ChapterLayout>
  );
};

export default ChapterBreath;
