import { useParams } from "react-router-dom";
import Drawer from "@material-ui/core/Drawer";

import ChapterAudioControls from "./ChapterAudioControls";
import ChapterAudioSync from "./ChapterAudioSync";

import useAudio from "../hooks/useAudio";

const ChapterAudio = () => {
  const { chapterId } = useParams();
  const {
    setPlaybackTime,
    getPlaybackTime,
    startPlayback,
    pausePlayback,
    playbackState,
  } = useAudio(`${process.env.REACT_APP_API_URL}/chapters/${chapterId}/audio`);

  return (
    <Drawer variant="persistent" anchor="bottom" open={true}>
      <ChapterAudioControls
        startPlayback={startPlayback}
        pausePlayback={pausePlayback}
        setPlaybackTime={setPlaybackTime}
        getPlaybackTime={getPlaybackTime}
        playbackState={playbackState}
      />
      <ChapterAudioSync
        startPlayback={startPlayback}
        pausePlayback={pausePlayback}
        getPlaybackTime={getPlaybackTime}
        playbackState={playbackState}
      />
    </Drawer>
  );
};

export default ChapterAudio;
