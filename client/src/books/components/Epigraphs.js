import { Box, Typography } from "@mui/material";
import Page from "../../common/components/Page";

const epigraphs = [
  {
    body: "Words are symbols representing things and ideas known to us; and these symbols do not and can not convey the true nature of even ordinary things. Language is considered deceptive and misleading in the matter of understanding of the Truth. So the Lankavatara-sutra says that ignorant people get stuck in words like an elephant in the mud.",
    author: "Walpola Rahula",
    source: "What the Buddha Taught",
    year: "1959",
  },
  {
    body: "We are, most of us, in a state of hypnosis, induced by the incantation of language. The enchantment is spellbinding. When one speaks of awakening... it means therefore de-hypnotisation, coming to your senses, but of course, to do that, you have to go out of your mind.",
    author: "Alan Watts",
    source: "a mix tape",
    year: "1992",
  },
  {
    body: "Marijuana was just like having a couple of beers really, but LSD was more like going to the moon.",
    author: "George Harrison",
    source: "The South Bank Show - the Making of Sgt Pepper",
    year: "June 14th 1992",
  },
  // {
  //   body: "If we could sniff or swallow something that would, for five or six hours each day, abolish our solitude as individuals, attune us with our fellows in a glowing exaltation of affection and make life in all its aspects seem not only worth living, but divinely beautiful and significant, and if this heavenly, world-transfiguring drug were of such a kind that we could wake up next morning with a clear head and an undamaged constitution – then, it seems to me, all our problems (...) would be wholly solved and earth would become paradise.",
  //   author: "Aldous Huxley",
  //   source: "Moksha",
  //   year: "1977",
  // },
];

const Epigraph = ({ epigraph }) => {
  const { body, author, source, year } = epigraph;
  return (
    <Box mt={4}>
      <Typography>{body}</Typography>
      <Typography align="right">
        - {author},{" "}
        <span style={{ fontStyle: "italic" }}>
          {source}, {year}
        </span>
      </Typography>
    </Box>
  );
};

const Epigraphs = () => {
  return (
    <Page maxReadingWidth={500}>
      <Box>
        {epigraphs.map((epigraph) => {
          return <Epigraph key={epigraph.author} epigraph={epigraph} />;
        })}
      </Box>
    </Page>
  );
};

export default Epigraphs;
