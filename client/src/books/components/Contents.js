import { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Collapse, Button, Typography, Box } from "@mui/material";

import makeStyles from "@mui/styles/makeStyles";

import Header from "../../components/Header";
import Footer from "../../components/Footer";

import {
  usePopupState,
  bindHover,
  bindPopover,
} from "material-ui-popup-state/hooks";
import HoverPopover from "material-ui-popup-state/HoverPopover";

import Page from "../../common/components/Page";
import RotatingChevron from "../../common/components/RotatingChevron";

import {
  selectFeaturedBook,
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
  link: {
    textTransform: "lowercase",
    fontWeight: "bold",
  },
  emptyChapterText: {
    color: theme.palette.grey[700],
  },
  otherSections: {
    color: theme.palette.grey[700],
  },
  popover: {
    pointerEvents: "none",
  },
  popoverText: {
    padding: theme.spacing(1),
  },
}));

const FullChapter = (props) => {
  const { chapter, partIdx, index } = props;
  const classes = useStyles();
  return (
    <Button
      className={classes.link}
      component={Link}
      to={`/${partIdx}/${index}`}
      color="grey"
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
      <Button color="grey" className={classes.link} {...bindHover(popupState)}>
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

const ContentPart = (props) => {
  const { part, partIdx } = props;
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
              <FullChapter
                chapter={chapter}
                partIdx={partIdx}
                index={index}
                key={index}
              />
            ) : (
              <EmptyChapter
                chapter={chapter}
                partIdx={partIdx}
                index={index}
                key={index}
              />
            )
          )}
        </ol>
      </Collapse>
    </>
  );
};

const Quotes = () => {
  const classes = useStyles();
  return (
    <>
      <Box mt={2}>
        <Button
          className={classes.link}
          component={Link}
          to={"/epigraphs"}
          color="grey"
        >
          <Typography variant="h3" className={classes.otherSections}>
            epigraphs
          </Typography>
        </Button>
      </Box>
    </>
  );
};

const Blurb = () => {
  const classes = useStyles();
  return (
    <>
      <Box mt={2}>
        <Button
          className={classes.link}
          component={Link}
          to={"/backcover"}
          color="grey"
        >
          <Typography variant="h3" className={classes.otherSections}>
            back cover
          </Typography>
        </Button>
      </Box>
    </>
  );
};

const Contents = () => {
  const book = useSelector(selectFeaturedBook);
  const parts = useSelector((state) => selectPartsOfBook(state, book));

  return (
    <>
      <Header hideTitle={true}></Header>
      <Page>
        <Box mb={3}>
          <Typography component="h1" variant="h1">
            {book.title}
          </Typography>
        </Box>
        {/* <Box mt={3}>
          <Quotes />
        </Box> */}
        <Box>
          {parts.map((part, index) => (
            <ContentPart part={part} partIdx={index} key={index} />
          ))}
        </Box>
        {/* <Box mt={3}>
          <Blurb />
        </Box> */}
      </Page>
      <Footer />
    </>
  );
};

// Wrap the content so that it's not rendered until the content initialised
const ContentsWrapper = () => {
  return (
    <ContentInitialised>
      <Contents />
    </ContentInitialised>
  );
};

export default ContentsWrapper;
