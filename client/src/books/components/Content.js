import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import {
  Container,
  Collapse,
  makeStyles,
  Button,
  Typography,
  Box,
} from "@material-ui/core";

import ExpandMoreIcon from "@material-ui/icons/ExpandMore";

import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import HoverPopover from "material-ui-popup-state/HoverPopover";

import {
  selectAllnighter,
  selectPartsOfBook,
  selectChaptersOfPart,
  selectReadingPartId,
} from "../selectors";

import ContentInitialised from "./ContentInitialised";

const useStyles = makeStyles((theme) => ({
  partTitle: {
    textTransform: "lowercase",
    fontSize: "1.5rem",
    fontWeight: "bold",
    display: "inline",
  },
  chapterList: {
    listStyleType: "none",
    margin: 0,
    padding: 0,
  },
  chapterListItem: {
    display: "inline",
  },
  chapterTitle: {
    textTransform: "lowercase",
    fontSize: "1.17rem",
    fontWeight: "bold",
  },
  emptyChapterText: {
    color: theme.palette.grey[600],
  },
  popover: {
    pointerEvents: "none",
  },
  popoverText: {
    padding: theme.spacing(1),
  },
}));

const FullChapter = (props) => {
  const { chapter } = props;
  const classes = useStyles();
  return (
    <Button
      className={classes.chapterTitle}
      component={Link}
      to={`/chapter/${chapter._id}`}
    >
      <Typography variant="h3">{chapter.title}</Typography>
    </Button>
  );
};

const EmptyChapter = (props) => {
  const { chapter } = props;
  const classes = useStyles();
  const popupState = usePopupState({
    variant: "popover",
    popupId: "emptyChapterPopover",
  });
  return (
    <>
      <Button className={classes.chapterTitle} {...bindHover(popupState)}>
        <Typography variant="h3" className={classes.emptyChapterText}>
          {chapter.title}
        </Typography>
      </Button>
      <HoverPopover
        {...bindPopover(popupState)}
        anchorOrigin={{
          vertical: "center",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
        }}
        className={classes.popover}
      >
        <Typography className={classes.popoverText}>Coming soon</Typography>
      </HoverPopover>
    </>
  );
};

const ContentChapter = (props) => {
  const { chapter } = props;
  const classes = useStyles();
  return (
    <li className={classes.chapterListItem}>
      {chapter.body ? (
        <FullChapter chapter={chapter} />
      ) : (
        <EmptyChapter chapter={chapter} />
      )}
    </li>
  );
};

const RotatingChevron = (props) => {
  const { open, setOpen } = props;
  const handleRotate = () => setOpen(!open);
  const rotate = open ? "rotate(180deg)" : "rotate(0)";
  return (
    <ExpandMoreIcon
      style={{ transform: rotate, transition: "all 0.1s linear" }}
      onClick={handleRotate}
    />
  );
};

const ContentPart = (props) => {
  const { part } = props;
  const chapters = useSelector((state) => selectChaptersOfPart(state, part));
  const readingPartId = useSelector(selectReadingPartId);
  const [open, setOpen] = useState(part._id === readingPartId);
  const classes = useStyles();
  return (
    <>
      <Box mt={2} display="flex" alignItems="center" flexWrap="wrap">
        <Typography component="h2" variant="h2">
          {part.title}
        </Typography>
        <RotatingChevron open={open} setOpen={setOpen} />
      </Box>
      <Collapse in={open}>
        <ol className={classes.chapterList}>
          {chapters.map((chapter, index) =>
            chapter.body ? (
              <ContentChapter chapter={chapter} key={index} />
            ) : (
              <EmptyChapter chapter={chapter} key={index} />
            )
          )}
        </ol>
      </Collapse>
    </>
  );
};

const Content = () => {
  const book = useSelector(selectAllnighter);
  const parts = useSelector((state) => selectPartsOfBook(state, book));

  return (
    <Container maxWidth="sm">
      <Box mt={6} mb={3}>
        <Typography component="h1" variant="h1">
          {book.title}
        </Typography>
      </Box>
      {parts.map((part, index) => (
        <ContentPart part={part} key={index} />
      ))}
    </Container>
  );
};

// Wrap the content so that it's not rendered until the content initialised
const ContentWrapper = () => {
  return (
    <ContentInitialised>
      <Content />
    </ContentInitialised>
  );
};

export default ContentWrapper;
