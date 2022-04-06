import React, { useState } from "react";
import { useSelector } from "react-redux";

import {
  Container,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Collapse,
  IconButton,
} from "@material-ui/core";

import { AddCircle, ExpandLess, ExpandMore } from "@material-ui/icons";

import BookForm from "./BookForm.js";
import Parts from "./Parts.js";
import Loading from "../../../common/components/Loading";
import { selectBooks, selectIsContentInitialised } from "../../selectors";

const BookListItem = (props) => {
  const { book } = props;
  const [open, setOpen] = useState(true);

  return (
    <>
      <ListItem button onClick={() => setOpen(!open)}>
        <ListItemText primary={book.title} />
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
    <Container maxWidth="sm">
      {!isContentInitialised ? (
        <Loading />
      ) : (
        <>
          <List dense component="div">
            {books.map((book) => (
              <BookListItem book={book} key={book._id} />
            ))}
            <ListItem>
              <ListItemAvatar>
                <IconButton onClick={() => setDialogOpen(true)}>
                  <AddCircle />
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
