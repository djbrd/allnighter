import { api } from "../../utils/api";

import {
  INIT_CONTENT,
  INIT_FAILURE,
  CREATE_BOOK,
  CREATE_PART,
  DELETE_PART,
  CREATE_CHAPTER,
  DELETE_CHAPTER,
  CREATE_CHAPTER_BODY,
  CREATE_CHAPTER_AUDIO,
  DELETE_CHAPTER_AUDIO,
  INIT_CHAPTER_BODY,
  CLEAR_SENTENCE_START_TIMES,
  SET_SENTENCE_START_TIME,
  SPLIT_SENTENCE,
  MERGE_SENTENCES,
  CHANGE_SENTENCE,
  START_READING,
  STOP_READING,
  NEXT_SENTENCE,
  PREVIOUS_SENTENCE,
  SET_SENTENCE,
  SET_CHAPTER,
} from "./types";

export const contentInit = () => async (dispatch) => {
  try {
    const res = await api.get(
      `/books/title/${process.env.REACT_APP_FEATURED_BOOK_TITLE}`
    );
    if (!res.data.book) {
      throw new Error("Failed to get data to initialise content");
    }
    dispatch({ type: INIT_CONTENT, payload: [res.data.book] });
  } catch (err) {
    dispatch(initFailure());
  }
};

export const initFailure = () => {
  return { type: INIT_FAILURE };
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

export const createChapterBody = (chapter) => {
  return {
    type: CREATE_CHAPTER_BODY,
    payload: { chapter },
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

export const initChapterBody = (chapter) => {
  return { type: INIT_CHAPTER_BODY, payload: { chapter } };
};

export const setChapter = (chapterId) => {
  return {
    type: SET_CHAPTER,
    payload: { chapterId },
  };
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

export const changeSentence = (chapterId, paragraphId, sentenceId, text) => {
  return {
    type: CHANGE_SENTENCE,
    payload: { chapterId, paragraphId, sentenceId, text },
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
