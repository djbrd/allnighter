import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import RecordVoiceOverIcon from "@material-ui/icons/RecordVoiceOver";
import VoiceOverOffIcon from "@material-ui/icons/VoiceOverOff";
import SyncIcon from "@material-ui/icons/Sync";
import ReorderIcon from "@material-ui/icons/Reorder";

import ChapterForm from "./ChapterForm.js";
import ChapterAudioForm from "./ChapterAudioForm.js";
import ConfirmDialog from "../../common/components/ConfirmDialog";
import { deleteChapter, deleteChapterAudio } from "../actions";
import { selectChaptersOfPart } from "../selectors";

const ChapterListItem = (props) => {
  const { chapter, partId } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmAudioOpen, setConfirmAudioOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const dispatch = useDispatch();

  const onConfirmDelete = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/chapters/${chapter._id}`
      );
      dispatch(deleteChapter(partId, chapter._id));
    } catch (err) {
      // TODO
      console.log(err);
    }
  };

  const onConfirmDeleteAudio = async () => {
    try {
      await axios.delete(
        `${process.env.REACT_APP_API_URL}/chapters/${chapter._id}/audio`
      );
      dispatch(deleteChapterAudio(chapter._id));
    } catch (err) {
      // TODO
      console.log(err);
    }
  };

  return (
    <>
      <ListItem>
        <ListItemText>{chapter.title}</ListItemText>
        <IconButton
          size="small"
          component={Link}
          to={`/chapterbreath/${chapter._id}`}
        >
          <ReorderIcon />
        </IconButton>
        {chapter.audio ? (
          <>
            <IconButton size="small" component={Link} to={`/chapter/${chapter._id}`}>
              <SyncIcon />
            </IconButton>
            <IconButton size="small" onClick={() => setConfirmAudioOpen(true)}>
              <VoiceOverOffIcon />
            </IconButton>
          </>
        ) : (
          <IconButton size="small" onClick={() => setAudioOpen(true)}>
            <RecordVoiceOverIcon />
          </IconButton>
        )}
        <IconButton size="small" onClick={() => setConfirmOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <ChapterAudioForm
        chapterId={chapter._id}
        open={audioOpen}
        onClose={() => setAudioOpen(false)}
      />
      <ConfirmDialog
        title="Delete Chapter?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirmDelete}
      >
        Confirm deletion of chapter?
      </ConfirmDialog>
      <ConfirmDialog
        title="Delete Chapter Audio?"
        open={confirmAudioOpen}
        onClose={() => setConfirmAudioOpen(false)}
        onConfirm={onConfirmDeleteAudio}
      >
        Confirm deletion of chapter's audio?
      </ConfirmDialog>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  doubleNested: {
    paddingLeft: theme.spacing(8),
  },
  insideList: {
    borderLeft: "1px solid",
  },
}));

const Chapters = (props) => {
  const { part } = props;
  const chapters = useSelector((state) => selectChaptersOfPart(state, part));
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <List component="div" className={classes.doubleNested}>
        <div className={classes.insideList}>
          {chapters.map((chapter) => (
            <ChapterListItem
              chapter={chapter}
              partId={part._id}
              key={chapter._id}
            />
          ))}
        </div>
        <ListItem>
          <ListItemAvatar>
            <IconButton onClick={() => setDialogOpen(true)}>
              <AddCircleIcon />
            </IconButton>
          </ListItemAvatar>
        </ListItem>
      </List>
      <ChapterForm
        partId={part._id}
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
      />
    </>
  );
};

export default Chapters;
