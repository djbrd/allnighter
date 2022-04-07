import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import makeStyles from '@mui/styles/makeStyles';
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import IconButton from "@mui/material/IconButton";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import RecordVoiceOverIcon from "@mui/icons-material/RecordVoiceOver";
import SyncIcon from "@mui/icons-material/Sync";
import ReorderIcon from "@mui/icons-material/Reorder";
import PublishIcon from "@mui/icons-material/Publish";
import BookIcon from "@mui/icons-material/Book";

import FormDialog from "../../../common/components/FormDialog";
import ConfirmDialog from "../../../common/components/ConfirmDialog";
import ChapterForm from "./ChapterForm.js";
import ChapterAudioForm from "./ChapterAudioForm.js";
import ChapterBodyForm from "./ChapterBodyForm";
import { deleteChapter } from "../../actions";
import { selectChaptersOfPart } from "../../selectors";

import { api } from "../../../utils/api";

const ChapterListItem = (props) => {
  const { chapter, partId, partIdx, index } = props;
  const [bodyOpen, setBodyOpen] = useState(false);
  const [audioOpen, setAudioOpen] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const dispatch = useDispatch();

  const onConfirmDelete = async () => {
    try {
      await api.delete(`/chapters/${chapter._id}`);
      dispatch(deleteChapter(partId, chapter._id));
    } catch (err) {
      // TODO
      console.log(err);
    }
  };

  return (
    <>
      <ListItem>
        <ListItemText primary={chapter.title} />
        {chapter.body && (
          <>
            <IconButton
              size="small"
              component={Link}
              to={`/${partIdx}/${index}`}
            >
              <BookIcon />
            </IconButton>
            <IconButton
              size="small"
              component={Link}
              to={`/admin/chapterbreath/${partIdx}/${index}`}
            >
              <ReorderIcon />
            </IconButton>
          </>
        )}
        <IconButton size="small" onClick={() => setBodyOpen(true)}>
          <PublishIcon />
        </IconButton>
        {chapter.audio && (
          <IconButton
            size="small"
            component={Link}
            to={`/admin/chaptersync/${partIdx}/${index}`}
          >
            <SyncIcon />
          </IconButton>
        )}
        <IconButton size="small" onClick={() => setAudioOpen(true)}>
          <RecordVoiceOverIcon />
        </IconButton>
        <IconButton size="small" onClick={() => setConfirmOpen(true)}>
          <DeleteIcon />
        </IconButton>
      </ListItem>
      <FormDialog open={bodyOpen} onClose={() => setBodyOpen(false)}>
        <ChapterBodyForm
          chapterId={chapter._id}
          onClose={() => setBodyOpen(false)}
        />
      </FormDialog>
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
  const { part, partIdx } = props;
  const chapters = useSelector((state) => selectChaptersOfPart(state, part));
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  return <>
    <List dense component="div" className={classes.doubleNested}>
      <div className={classes.insideList}>
        {chapters.map((chapter, index) => (
          <ChapterListItem
            chapter={chapter}
            partId={part._id}
            partIdx={partIdx}
            index={index}
            key={chapter._id}
          />
        ))}
      </div>
      <ListItem>
        <ListItemAvatar>
          <IconButton onClick={() => setDialogOpen(true)} size="large">
            <AddCircleIcon />
          </IconButton>
        </ListItemAvatar>
      </ListItem>
    </List>
    <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
      <ChapterForm partId={part._id} onClose={() => setDialogOpen(false)} />
    </FormDialog>
  </>;
};

export default Chapters;
