import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import { Button, Grid } from "@material-ui/core";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddIcon from "@material-ui/icons/Add";
import PauseIcon from "@material-ui/icons/Pause";

import {
  clearSentenceStartTimes,
  setSentenceStartTime,
  nextSentence,
  startReading,
} from "../../actions";
import {
  selectChapterId,
  selectSentenceStartTimes,
  selectReadingSentenceIdx,
} from "../../selectors";

import {
  //PLAYBACK_LOADING,
  PLAYBACK_READY,
  //PLAYBACK_PLAYING,
  PLAYBACK_ENDED,
} from "../../hooks/playbackStates";

import { api } from "../../../utils/api";

const SyncControls = (props) => {
  const { partIdx, chapterIdx } = useParams();
  const chapterId = useSelector((state) =>
    selectChapterId(state, partIdx, chapterIdx)
  );
  const { getPlaybackTime, startPlayback, pausePlayback, playbackState } =
    props;

  const [syncRecording, setSyncRecording] = useState(false);
  const sentenceStartTimes = useSelector((state) =>
    selectSentenceStartTimes(state, chapterId)
  );
  const activeSentenceIdx = useSelector(selectReadingSentenceIdx);
  const dispatch = useDispatch();

  const mounted = useRef(false);

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
      return;
    }

    const persistSentenceStartTimes = async () => {
      try {
        await api.patch(`/chapters/${chapterId}`, { sentenceStartTimes });
      } catch (err) {
        // TODO
        console.log(err);
      }
    };
    persistSentenceStartTimes();
  }, [chapterId, sentenceStartTimes]);

  useEffect(() => {
    if (syncRecording && playbackState === PLAYBACK_ENDED) {
      setSyncRecording(false);
    }
  }, [syncRecording, playbackState]);

  const record = () => {
    setSyncRecording(true);
    if (activeSentenceIdx === -1) {
      dispatch(startReading());
      dispatch(clearSentenceStartTimes(chapterId));
    }
    startPlayback();
  };

  const pause = () => {
    setSyncRecording(false);
    pausePlayback();
  };

  const onSentenceEnd = () => {
    dispatch(
      setSentenceStartTime(chapterId, activeSentenceIdx + 1, getPlaybackTime())
    );
    dispatch(nextSentence());
  };

  return (
    <Grid container direction="row" justify="center" alignItems="center">
      {syncRecording ? (
        <Button onClick={pause}>
          <PauseIcon />
        </Button>
      ) : (
        <Button onClick={record} disabled={playbackState !== PLAYBACK_READY}>
          <FiberManualRecordIcon />
        </Button>
      )}
      <Button onClick={onSentenceEnd} disabled={!syncRecording}>
        <AddIcon />
      </Button>
    </Grid>
  );
};

export default SyncControls;
