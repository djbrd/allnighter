import { combineReducers } from "redux";
import auth from "../auth/reducers";
import content from "../books/reducers/content";
import reading from "../books/reducers/reading";

export default combineReducers({
  auth,
  content,
  reading,
});
