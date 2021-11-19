import axios from "axios";

import {
  INIT_CONTENT,
  CREATE_BOOK,
  CREATE_PART,
  DELETE_PART,
  CREATE_CHAPTER,
  DELETE_CHAPTER,
  CREATE_CHAPTER_AUDIO,
  DELETE_CHAPTER_AUDIO,
  INIT_CHAPTER_BODY,
  CLEAR_SENTENCE_START_TIMES,
  SET_SENTENCE_START_TIME,
  SPLIT_SENTENCE,
  MERGE_SENTENCES,
  START_READING,
  STOP_READING,
  NEXT_SENTENCE,
  PREVIOUS_SENTENCE,
  SET_SENTENCE,
} from "./types";

export const contentInit = () => async (dispatch) => {
  const res = await axios.get(`${process.env.REACT_APP_API_URL}/books`);
  dispatch({ type: INIT_CONTENT, payload: res.data.books });
};

export const createBook = (book) => {
  return {
    type: CREATE_BOOK,
    payload: book,
  };
};

export const createPart = (bookId, part) => {
  return {
    type: CREATE_PART,
    payload: { bookId, part },
  };
};

export const deletePart = (bookId, partId) => {
  return {
    type: DELETE_PART,
    payload: { bookId, partId },
  };
};

export const createChapter = (partId, chapter) => {
  return {
    type: CREATE_CHAPTER,
    payload: { partId, chapter },
  };
};

export const deleteChapter = (partId, chapterId) => {
  return {
    type: DELETE_CHAPTER,
    payload: { partId, chapterId },
  };
};

export const createChapterAudio = (chapterId) => {
  return {
    type: CREATE_CHAPTER_AUDIO,
    payload: { chapterId },
  };
};

export const deleteChapterAudio = (chapterId) => {
  return {
    type: DELETE_CHAPTER_AUDIO,
    payload: { chapterId },
  };
};

export const fetchChapterBody = (chapterId) => async (dispatch) => {
  const res = await axios(
    `${process.env.REACT_APP_API_URL}/chapters/${chapterId}`
  );

  let { chapter } = res.data;
  dispatch({ type: INIT_CHAPTER_BODY, payload: { chapter } });
};

export const clearSentenceStartTimes = (chapterId) => {
  return {
    type: CLEAR_SENTENCE_START_TIMES,
    payload: { chapterId },
  };
};

export const setSentenceStartTime = (chapterId, sentenceIdx, time) => {
  return {
    type: SET_SENTENCE_START_TIME,
    payload: { chapterId, sentenceIdx, time },
  };
};

export const splitSentence = (chapterId, paragraphId, sentenceId, splitIdx) => {
  return {
    type: SPLIT_SENTENCE,
    payload: { chapterId, paragraphId, sentenceId, splitIdx },
  };
};

export const mergeSentences = (chapterId, paragraphId, sentenceId) => {
  return {
    type: MERGE_SENTENCES,
    payload: { chapterId, paragraphId, sentenceId },
  };
};

export const startReading = () => {
  return {
    type: START_READING,
  };
};

export const stopReading = () => {
  return {
    type: STOP_READING,
  };
};

export const nextSentence = () => {
  return {
    type: NEXT_SENTENCE,
  };
};

export const previousSentence = () => {
  return {
    type: PREVIOUS_SENTENCE,
  };
};

export const setSentence = (idx) => {
  return {
    type: SET_SENTENCE,
    payload: idx,
  };
};
