import React, { useEffect, useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

import { Typography } from "@mui/material";

import ChapterLayout from "../ChapterLayout";
import FormDialog from "../../../common/components/FormDialog";
import SentenceForm from "./SentenceForm";

import { splitSentence, mergeSentences } from "../../actions";
import { selectChapterId, selectChapterParagraphs } from "../../selectors";
import { api } from "../../../utils/api";

// Background colors for sentences
const backgroundColors = [
  "	#e9e4ff",
  "#ffd4d4",
  "#e4ffe7",
  "#e4f0ff",
  "#feffe4",
];

const Sentence = (props) => {
  const { addSpace, text, chapterId, paragraphId, sentenceId, color } = props;
  const dispatch = useDispatch();
  const [dialogOpen, setDialogOpen] = useState(false);

  const onSplitSentence = () => {
    if (window.getSelection()) {
      if (window.getSelection().isCollapsed) {
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
      } else {
        setDialogOpen(true);
      }
    } else {
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
      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <SentenceForm
          onClose={() => setDialogOpen(false)}
          chapterId={chapterId}
          paragraphId={paragraphId}
          sentenceId={sentenceId}
          text={text}
        />
      </FormDialog>
    </>
  );
};

const ChapterBreath = () => {
  const { partIdx, chapterIdx } = useParams();
  const chapterId = useSelector((state) =>
    selectChapterId(state, partIdx, chapterIdx)
  );
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
        await api.patch(`/chapters/${chapterId}`, { paragraphs });
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
                      chapterId={chapterId}
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
