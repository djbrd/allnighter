import {
  INIT_CHAPTER_BODY,
  START_READING,
  STOP_READING,
  NEXT_SENTENCE,
  PREVIOUS_SENTENCE,
  SET_SENTENCE,
} from "../actions/types";

const INITIAL_STATE = {
  chapterId: -1,
  sentenceIdx: -1,
};

const reading = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case INIT_CHAPTER_BODY:
      const {chapter} = action.payload;
      return {
        ...state,
        chapterId: chapter._id,
        sentenceIdx: -1,
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
      }
    case PREVIOUS_SENTENCE: {
      return {
        ...state,
        sentenceIdx: state.sentenceIdx - 1,
      }
    }
    case SET_SENTENCE: {
      return {
        ...state,
        sentenceIdx: action.payload,
      }
    }
    default:
      return state;
  }
}

export default reading;