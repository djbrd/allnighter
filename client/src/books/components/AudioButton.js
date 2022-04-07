import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Fab } from "@mui/material";
import makeStyles from '@mui/styles/makeStyles';
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import PauseIcon from "@mui/icons-material/Pause";

import { startReading, nextSentence } from "../actions";
import {
  selectChapterId,
  selectSentenceStartTimes,
  selectReadingSentenceIdx,
} from "../selectors";

import {
  PLAYBACK_READY,
  PLAYBACK_PLAYING,
  PLAYBACK_ENDED,
} from "../hooks/playbackStates";

const useStyles = makeStyles((theme) => ({
  fab: {
    // boxShadow: "none",
    // backgroundColor: "transparent",
    // "&:hover": {
    //   backgroundColor: "transparent",
    // },
    position: "fixed",
    bottom: theme.spacing(5),
    right: "50vw",
  },
}));

const AudioButton = (props) => {
  const { partIdx, chapterIdx } = useParams();
  const chapterId = useSelector((state) =>
    selectChapterId(state, partIdx, chapterIdx)
  );

  const { getPlaybackTime, startPlayback, pausePlayback, playbackState } =
    props;
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

  const classes = useStyles();
  if (playbackState === PLAYBACK_PLAYING && syncingText) {
    return (
      <Fab onClick={pause} className={classes.fab}>
        <PauseIcon />
      </Fab>
    );
  } else {
    return (
      <Fab
        onClick={play}
        disabled={
          playbackState !== PLAYBACK_READY ||
          (playbackState === PLAYBACK_PLAYING && !syncingText)
        }
        className={classes.fab}
      >
        <PlayArrowIcon />
      </Fab>
    );
  }
};

export default AudioButton;
