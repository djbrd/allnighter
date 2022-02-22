import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { makeStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import DeleteIcon from "@material-ui/icons/Delete";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import PartForm from "./PartForm.js";
import Chapters from "./Chapters.js";
import FormDialog from "../../common/components/FormDialog";
import ConfirmDialog from "../../common/components/ConfirmDialog";
import { deletePart } from "../actions";
import { selectPartsOfBook } from "../selectors";
import { api } from "../../utils/api";

const PartListItem = (props) => {
  const { part, bookId } = props;
  const [open, setOpen] = useState(true);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const dispatch = useDispatch();

  const onConfirmDelete = async () => {
    try {
      setDeleting(true);
      await api.delete(`/parts/${part._id}`);
      dispatch(deletePart(bookId, part._id));
    } catch (err) {
      // TODO
      console.log(err);
    }
    setDeleting(false);
  };

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={part.title} />
        <IconButton onClick={() => setConfirmOpen(true)} disabled={deleting}>
          <DeleteIcon />
        </IconButton>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <ConfirmDialog
        title="Delete Part?"
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={onConfirmDelete}
      >
        Confirm deletion of part (and any chapters in it)?
      </ConfirmDialog>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Chapters part={part} />
      </Collapse>
    </>
  );
};

const useStyles = makeStyles((theme) => ({
  nested: {
    paddingLeft: theme.spacing(4),
  },
  insideList: {
    borderLeft: "1px solid",
  },
}));

const Parts = (props) => {
  const { book } = props;
  const parts = useSelector((state) => selectPartsOfBook(state, book));
  const [dialogOpen, setDialogOpen] = useState(false);
  const classes = useStyles();

  return (
    <>
      <List dense component="div" className={classes.nested}>
        <div className={classes.insideList}>
          {parts.map((part) => (
            <PartListItem part={part} bookId={book._id} key={part._id} />
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
      <FormDialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
        <PartForm
          bookId={book._id}
          open={dialogOpen}
          onClose={() => setDialogOpen(false)}
        />
      </FormDialog>
    </>
  );
};

export default Parts;
