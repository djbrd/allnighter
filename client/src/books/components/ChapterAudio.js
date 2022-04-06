import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import ChapterLayout from "./ChapterLayout";
import ChapterBodyScroll from "./ChapterBodyScroll";
import AudioControls from "./AudioControls";
// import AudioButton from "./AudioButton";
import Footer from "../../components/Footer";

import useAudio from "../hooks/useAudio";
import { PLAYBACK_PLAYING } from "../hooks/playbackStates";

import { selectChapterId } from "../selectors";

const Audio = () => {
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
      {/* <AudioButton
        startPlayback={startPlayback}
        pausePlayback={pausePlayback}
        getPlaybackTime={getPlaybackTime}
        playbackState={playbackState}
      /> */}
      <Footer stayPut={playbackState === PLAYBACK_PLAYING}>
        <AudioControls
          startPlayback={startPlayback}
          pausePlayback={pausePlayback}
          setPlaybackTime={setPlaybackTime}
          getPlaybackTime={getPlaybackTime}
          playbackState={playbackState}
        />
      </Footer>
    </>
  );
};

// Wrap the above component in ChapterLayout to handle initialising of content
const ChapterAudio = () => {
  return (
    <>
      <ChapterLayout>
        <Audio />
      </ChapterLayout>
    </>
  );
};

export default ChapterAudio;
