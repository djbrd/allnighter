import { useRef, useEffect, useState } from "react";

import {
  PLAYBACK_LOADING,
  PLAYBACK_READY,
  PLAYBACK_PLAYING,
  PLAYBACK_ENDED,
} from "./playbackStates";

const useAudio = (src) => {
  const audioRef = useRef(new Audio(src));

  const [playbackState, setPlaybackState] = useState(PLAYBACK_LOADING);

  const setPlaybackTime = (time) => (audioRef.current.currentTime = time);
  const getPlaybackTime = () => audioRef.current.currentTime;

  const startPlayback = () => {
    audioRef.current.play();
    setPlaybackState(PLAYBACK_PLAYING);
  };

  const pausePlayback = () => {
    audioRef.current.pause();
    setPlaybackState(PLAYBACK_READY);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const onCanPlay = (event) => {
      console.log("CAN PLAY");
      setPlaybackState(PLAYBACK_READY);
    };
    audio.addEventListener("canplay", onCanPlay);

    const onEnded = (event) => {
      setPlaybackState(PLAYBACK_ENDED);
    };
    audio.addEventListener("ended", onEnded);

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
    };
  }, []);

  return {
    setPlaybackTime,
    getPlaybackTime,
    startPlayback,
    pausePlayback,
    playbackState,
  };
};

export default useAudio;
