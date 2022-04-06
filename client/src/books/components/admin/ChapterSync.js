import { useParams } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";
import { useSelector } from "react-redux";

import ChapterLayout from "../ChapterLayout";
import ChapterBodyScroll from "../ChapterBodyScroll";
import SyncControls from "./SyncControls";

import useAudio from "../../hooks/useAudio";

import { selectChapterId } from "../../selectors";

const Sync = () => {
  const { partIdx, chapterIdx } = useParams();
  const chapterId = useSelector((state) =>
    selectChapterId(state, partIdx, chapterIdx)
  );
  const {
    setPlaybackTime,
    getPlaybackTime,
    startPlayback,
    pausePlayback,
    playbackState,
  } = useAudio(`${process.env.REACT_APP_API_URL}/chapters/${chapterId}/audio`);

  return (
    <>
      <ChapterBodyScroll
        setPlaybackTime={setPlaybackTime}
        getPlaybackTime={getPlaybackTime}
      />
      <Drawer variant="persistent" anchor="bottom" open={true}>
        <SyncControls
          startPlayback={startPlayback}
          pausePlayback={pausePlayback}
          getPlaybackTime={getPlaybackTime}
          playbackState={playbackState}
        />
      </Drawer>
    </>
  );
};

const ChapterSync = () => {
  return (
    <ChapterLayout>
      <Sync />
    </ChapterLayout>
  );
};

export default ChapterSync;
