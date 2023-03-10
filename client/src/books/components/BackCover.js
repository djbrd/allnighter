import { Box, Typography } from "@mui/material";
import Page from "../../common/components/Page";

const BackCover = () => {
  return (
    <Page maxReadingWidth={500}>
      <Box sx={{ pt: { sm: 1, md: 2 } }}>
        <Typography paragraph>
          In the aftermath of the End of History&trade;, back when our current
          leaders were young, students in Birmingham are going to celebrate the
          conclusion of another academic year in a pair of terraced houses, each
          with a sound system.
        </Typography>
        <Typography paragraph>
          Alcohol will be verboten, dancing de rigeur.
        </Typography>
        <Typography paragraph>
          No one need bring anything. Seth will be there, as will Becca, Mani,
          Charlotte, Paul, and countless others.
        </Typography>
        <Typography paragraph>Come. You'll fit right in.</Typography>
      </Box>
    </Page>
  );
};

export default BackCover;
