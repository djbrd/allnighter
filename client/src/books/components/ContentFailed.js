import { Container, Typography, Box } from "@material-ui/core";

const ContentFailed = () => {
  return (
    <Container maxWidth="sm">
      <Box textAlign={"center"} mt={20}>
        <Typography>Failed to initialise content.</Typography>
        <Typography>Please contact admin and/or try again later.</Typography>
      </Box>
    </Container>
  );
};

export default ContentFailed;
