import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  CircularProgress,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse,
  IconButton,
} from "@material-ui/core";

import AddCircleIcon from "@material-ui/icons/AddCircle";
import ExpandLess from "@material-ui/icons/ExpandLess";
import ExpandMore from "@material-ui/icons/ExpandMore";

import BookForm from "./BookForm.js";
import Parts from "./Parts.js";
import { selectBooks, selectIsContentInitialised } from "../selectors";

const BookListItem = (props) => {
  const { book } = props;
  const [open, setOpen] = useState(true);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText>{book.title}</ListItemText>
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <Parts book={book} />
      </Collapse>
    </>
  );
};

const Books = () => {
  const books = useSelector(selectBooks);
  const isContentInitialised = useSelector(selectIsContentInitialised);
  const [dialogOpen, setDialogOpen] = useState(false);

  return (
    <Container maxWidth="md">
      {!isContentInitialised ? (
        <CircularProgress />
      ) : (
        <>
          <List component="div">
            {books.map((book) => (
              <BookListItem book={book} key={book._id} />
            ))}
            <ListItem>
              <ListItemAvatar>
                <IconButton onClick={() => setDialogOpen(true)}>
                  <AddCircleIcon />
                </IconButton>
              </ListItemAvatar>
            </ListItem>
          </List>
          <BookForm open={dialogOpen} onClose={() => setDialogOpen(false)} />
        </>
      )}
    </Container>
  );
};

export default Books;
