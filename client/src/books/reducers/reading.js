import {
  START_READING,
  STOP_READING,
  NEXT_SENTENCE,
  PREVIOUS_SENTENCE,
  SET_SENTENCE,
  SET_CHAPTER,
} from "../actions/types";

const INITIAL_STATE = {
  chapterId: -1,
  sentenceIdx: -1,
};

const reading = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case SET_CHAPTER:
      const { chapterId } = action.payload;
      const sentenceIdx =
        state.chapterId === chapterId ? state.sentenceIdx : -1;
      return {
        ...state,
        chapterId,
        sentenceIdx,
      };
    case START_READING:
      return {
        ...state,
        sentenceIdx: 0,
      };
    case STOP_READING:
      return {
        ...state,
        sentenceIdx: -1,
      };
    case NEXT_SENTENCE:
      return {
        ...state,
        sentenceIdx: state.sentenceIdx + 1,
      };
    case PREVIOUS_SENTENCE: {
      return {
        ...state,
        sentenceIdx: state.sentenceIdx - 1,
      };
    }
    case SET_SENTENCE: {
      return {
        ...state,
        sentenceIdx: action.payload,
      };
    }
    default:
      return state;
  }
};

export default reading;
