import { normalize } from "normalizr";
import produce from "immer";

import { bookSchema } from "./schema";
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
  CREATE_CHAPTER_BODY,
} from "../actions/types";

const INITIAL_STATE = {
  initialised: false,
  books: [],
  parts: [],
  chapters: [],
};

const content = produce((draft, action = {}) => {
  switch (action.type) {
    case INIT_CONTENT:
      let normalized = normalize(action.payload, [bookSchema]);
      const { books, chapters, parts } = normalized.entities;
      draft.initialised = true;
      draft.books = books;
      draft.chapters = chapters;
      draft.parts = parts;
      break;
    case CREATE_BOOK:
      const book = action.payload;
      draft.books[book._id] = book;
      break;
    case CREATE_PART:
      const { bookId, part } = action.payload;
      draft.books[bookId].parts.push(part._id);
      draft.parts[part._id] = part;
      break;
    case DELETE_PART: {
      const { bookId, partId } = action.payload;
      draft.books[bookId].parts = draft.books[bookId].parts.filter(
        (id) => id !== partId
      );
      delete draft.parts.partId;
      break;
    }
    case CREATE_CHAPTER: {
      const { partId, chapter } = action.payload;
      draft.parts[partId].chapters.push(chapter._id);
      draft.chapters[chapter._id] = chapter;
      break;
    }
    case DELETE_CHAPTER: {
      const { partId, chapterId } = action.payload;
      draft.parts[partId].chapters = draft.parts[partId].chapters.filter(
        (id) => id !== chapterId
      );
      delete draft.chapters.chapterId;
      break;
    }
    case CREATE_CHAPTER_BODY: {
      const { chapter } = action.payload;
      console.log(draft.chapters);
      console.log(chapter._id);
      draft.chapters[chapter._id] = chapter;
      break;
    }
    case CREATE_CHAPTER_AUDIO: {
      const { chapterId } = action.payload;
      draft.chapters[chapterId].audio = true;
      break;
    }
    case DELETE_CHAPTER_AUDIO: {
      const { chapterId } = action.payload;
      draft.chapters[chapterId].audio = false;
      break;
    }
    case INIT_CHAPTER_BODY: {
      const { chapter } = action.payload;
      draft.chapters[chapter._id]["body"] = chapter.body;
      draft.chapters[chapter._id]["paragraphs"] = chapter.paragraphs;
      draft.chapters[chapter._id]["sentenceStartTimes"] =
        chapter.sentenceStartTimes;
      break;
    }
    case CLEAR_SENTENCE_START_TIMES: {
      const { chapterId } = action.payload;
      draft.chapters[chapterId].sentenceStartTimes = [0];
      break;
    }
    case SET_SENTENCE_START_TIME: {
      const { chapterId, sentenceIdx, time } = action.payload;
      const numTimes = draft.chapters[chapterId].sentenceStartTimes.length;
      if (numTimes < sentenceIdx) {
        throw new Error("Trying to add a sentence start time too late");
      } else if (numTimes === sentenceIdx) {
        draft.chapters[chapterId].sentenceStartTimes.push(time);
      } else {
        draft.chapters[chapterId].sentenceStartTimes[sentenceIdx] = time;
      }
      break;
    }
    case SPLIT_SENTENCE: {
      const { chapterId, paragraphId, sentenceId, splitIdx } = action.payload;
      const sentence =
        draft.chapters[chapterId].paragraphs[paragraphId][sentenceId];
      const first = sentence.substring(0, splitIdx);
      const second = sentence.substring(splitIdx + 1);
      draft.chapters[chapterId].paragraphs[paragraphId][sentenceId] = first;
      draft.chapters[chapterId].paragraphs[paragraphId].splice(
        sentenceId + 1,
        0,
        second
      );
      break;
    }
    case MERGE_SENTENCES: {
      const { chapterId, paragraphId, sentenceId } = action.payload;
      const sentence =
        draft.chapters[chapterId].paragraphs[paragraphId][sentenceId];
      const sentence1 =
        draft.chapters[chapterId].paragraphs[paragraphId][sentenceId + 1];
      draft.chapters[chapterId].paragraphs[paragraphId][sentenceId] =
        sentence + " " + sentence1;
      draft.chapters[chapterId].paragraphs[paragraphId].splice(
        sentenceId + 1,
        1
      );
      break;
    }

    default:
  }
}, INITIAL_STATE);

export default content;
