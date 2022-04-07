import { Grid, Box } from "@mui/material";
import { useTheme } from "@mui/material/styles";

import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappShareButton,
  TelegramShareButton,
  EmailShareButton,
} from "react-share";

import {
  FacebookIcon,
  TwitterIcon,
  LinkedinIcon,
  WhatsappIcon,
  TelegramIcon,
  EmailIcon,
} from "react-share";

const Sharing = () => {
  const theme = useTheme();
  const size = theme.spacing(4);
  const borderRadius = 10;
  const url = "https://www.djbrd.com";
  const title = "all-nighter by djbrd";
  const summary =
    "all-nighter is a novel and audiobook about love at a party in a pair of terraced houses, each with a sound system, in Birmingham in the summer of 1992";

  return (
    <>
      {/* <Grid
        container
        direction="row"
        justify="space-between"
        alignItems="center"
      > */}
      <Box display="grid" gridTemplateColumns="repeat(6, 1fr)" gap={1} pl={1}>
        <FacebookShareButton url={url} quote={summary}>
          <FacebookIcon size={size} borderRadius={borderRadius} />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title={title} /*via={} hashtags={} related={}*/
        >
          <TwitterIcon size={size} borderRadius={borderRadius} />
        </TwitterShareButton>
        <LinkedinShareButton
          url={"http://theguardian.com/uk"}
          // title={title}
          // summary={summary}
          // source={"www.djbrd.com"}
        >
          <LinkedinIcon size={size} borderRadius={borderRadius} />
        </LinkedinShareButton>
        <WhatsappShareButton url={url} title={title}>
          <WhatsappIcon size={size} borderRadius={borderRadius} />
        </WhatsappShareButton>
        <TelegramShareButton url={url} title={title}>
          <TelegramIcon size={size} borderRadius={borderRadius} />
        </TelegramShareButton>
        <EmailShareButton subject={title} body={summary}>
          <EmailIcon size={size} borderRadius={borderRadius} />
        </EmailShareButton>
      </Box>
      {/* </Grid> */}
    </>
  );
};

export default Sharing;
