import { useSelector } from "react-redux";

import ContentFailed from "./ContentFailed";
import Loading from "../../common/components/Loading";
import {
  selectInitFailureMessage,
  selectIsContentInitialised,
} from "../selectors";

const ContentInitialised = (props) => {
  const initFailureMessage = useSelector(selectInitFailureMessage);
  const isContentInitialised = useSelector(selectIsContentInitialised);

  return (
    <>
      {initFailureMessage ? (
        <ContentFailed />
      ) : !isContentInitialised ? (
        <Loading />
      ) : (
        props.children
      )}
    </>
  );
};

export default ContentInitialised;
