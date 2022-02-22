import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, Grid } from "@material-ui/core";
// import Fab from "@material-ui/core/Fab";

import PlayArrowIcon from "@material-ui/icons/PlayArrow";
import PauseIcon from "@material-ui/icons/Pause";
import SkipPreviousIcon from "@material-ui/icons/SkipPrevious";
import FastRewindIcon from "@material-ui/icons/FastRewind";
import FastForwardIcon from "@material-ui/icons/FastForward";
import SkipNextIcon from "@material-ui/icons/SkipNext";

import {
  startReading,
  nextSentence,
  setSentence,
  previousSentence,
} from "../actions";
import {
  selectSentenceStartTimes,
  selectReadingSentenceIdx,
} from "../selectors";

import {
  //PLAYBACK_LOADING,
  PLAYBACK_READY,
  PLAYBACK_PLAYING,
  PLAYBACK_ENDED,
} from "../hooks/playbackStates";

const AudioControls = (props) => {
  const { chapterId } = useParams();
  const {
    setPlaybackTime,
    getPlaybackTime,
    startPlayback,
    pausePlayback,
    playbackState,
  } = props;
  const [syncingText, setSyncingText] = useState(false);
  const dispatch = useDispatch();

  const timeOut = useRef(null);

  const sentenceStartTimes = useSelector((state) =>
    selectSentenceStartTimes(state, chapterId)
  );
  const activeSentenceIdx = useSelector(selectReadingSentenceIdx);

  useEffect(() => {
    if (syncingText && playbackState === PLAYBACK_PLAYING) {
      if (
        sentenceStartTimes.length &&
        sentenceStartTimes.length > activeSentenceIdx + 1
      ) {
        timeOut.current = setTimeout(
          () => dispatch(nextSentence()),
          (sentenceStartTimes[activeSentenceIdx + 1] - getPlaybackTime()) * 1000
        );
      }
    } else {
      clearTimeout(timeOut.current);
    }

    return () => {
      if (timeOut.current) clearTimeout(timeOut.current);
    };
  }, [
    activeSentenceIdx,
    syncingText,
    playbackState,
    sentenceStartTimes,
    dispatch,
    getPlaybackTime,
    setPlaybackTime,
  ]);

  // Stop when the audio has ended
  useEffect(() => {
    if (syncingText && playbackState === PLAYBACK_ENDED) {
      setSyncingText(false);
    }
  }, [syncingText, playbackState]);

  const play = () => {
    setSyncingText(true);
    if (sentenceStartTimes.length && activeSentenceIdx === -1)
      dispatch(startReading());
    startPlayback();
  };

  const pause = () => {
    setSyncingText(false);
    pausePlayback();
  };

  const toStart = () => {
    setPlaybackTime(0);
    if (sentenceStartTimes.length) {
      dispatch(setSentence(0));
    }
  };

  const fastForward = () => {
    if (activeSentenceIdx < sentenceStartTimes.length - 1) {
      setPlaybackTime(sentenceStartTimes[activeSentenceIdx + 1]);
      dispatch(nextSentence());
    }
  };

  const fastRewind = () => {
    if (activeSentenceIdx >= 0) {
      setPlaybackTime(sentenceStartTimes[activeSentenceIdx - 1]);
      dispatch(previousSentence());
    }
  };

  const toEnd = () => {
    if (sentenceStartTimes.length) {
      setPlaybackTime(sentenceStartTimes[sentenceStartTimes.length - 1]);
      dispatch(setSentence(sentenceStartTimes.length - 1));
    }
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {playbackState === PLAYBACK_PLAYING && syncingText ? (
        <Button onClick={pause}>
          <PauseIcon />
        </Button>
      ) : (
        <Button
          onClick={play}
          disabled={
            playbackState !== PLAYBACK_READY ||
            (playbackState === PLAYBACK_PLAYING && !syncingText)
          }
        >
          <PlayArrowIcon />
        </Button>
      )}
      <Button onClick={toStart}>
        <SkipPreviousIcon />
      </Button>
      <Button
        onClick={fastRewind}
        disabled={!sentenceStartTimes.length || activeSentenceIdx === 0}
      >
        <FastRewindIcon />
      </Button>
      <Button
        onClick={fastForward}
        disabled={
          !sentenceStartTimes.length ||
          activeSentenceIdx >= sentenceStartTimes.length - 1
        }
      >
        <FastForwardIcon />
      </Button>
      <Button onClick={toEnd} disabled={!sentenceStartTimes.length}>
        <SkipNextIcon />
      </Button>
    </Grid>
  );
};

export default AudioControls;
