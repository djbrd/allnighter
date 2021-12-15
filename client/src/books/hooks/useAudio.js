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
  };

  const pausePlayback = () => {
    audioRef.current.pause();
    setPlaybackState(PLAYBACK_READY);
  };

  useEffect(() => {
    const audio = audioRef.current;
    const onCanPlay = () => {
      setPlaybackState(PLAYBACK_READY);
    };
    audio.addEventListener("canplay", onCanPlay);

    const onEnded = () => {
      setPlaybackState(PLAYBACK_ENDED);
    };
    audio.addEventListener("ended", onEnded);

    const onSeeking = () => {
      setPlaybackState(PLAYBACK_LOADING);
    };
    audio.addEventListener("seeking", onSeeking);

    const onPlaying = () => {
      setPlaybackState(PLAYBACK_PLAYING);
    };
    audio.addEventListener("playing", onPlaying);

    // for debugging
    // const consoleLogEvent = (event) => console.log(event.type);
    // const events = [
    //   "audioprocess",
    //   "canplaythrough",
    //   "play",
    //   "playing",
    //   "seeked",
    //   "seeking",
    //   "stalled",
    //   "waiting",
    // ];

    // events.forEach((event) => {
    //   audio.addEventListener(event, consoleLogEvent);
    // });

    return () => {
      audio.removeEventListener("canplay", onCanPlay);
      audio.removeEventListener("ended", onEnded);
      audio.removeEventListener("seeking", onSeeking);
      audio.addEventListener("playing", onPlaying);
      // events.forEach((event) => {
      //   audio.removeEventListener(event, consoleLogEvent);
      // });
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
